package com.example.loginbackend.controller;

import com.example.loginbackend.model.Resume;
import com.example.loginbackend.model.user;
import com.example.loginbackend.repository.ResumeRepository;
import com.example.loginbackend.repository.UserRepository;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin
public class ResumeController {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    private final Path uploadDir = Paths.get("uploads/resumes");

    public ResumeController(
            ResumeRepository resumeRepository,
            UserRepository userRepository
    ) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;

        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not create upload directory",
                    e
            );
        }
    }

    // ============================================================
    // UPLOAD ORIGINAL RESUME
    // ============================================================

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "jobTitle", required = false) String jobTitle,
            @RequestParam(value = "jobDescription", required = false) String jobDescription
    ) {

        try {

            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Resume file is empty");
            }

            user existingUser = userRepository.findById(userId)
                    .orElse(null);

            if (existingUser == null) {
                return ResponseEntity.badRequest()
                        .body("User not found");
            }

            String originalFileName = file.getOriginalFilename();

            if (originalFileName == null || originalFileName.isBlank()) {
                return ResponseEntity.badRequest()
                        .body("Invalid file name");
            }

            String safeFileName =
                    System.currentTimeMillis() + "_" + originalFileName;

            Path filePath = uploadDir.resolve(safeFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            Resume resume = new Resume();

            resume.setOriginalFileName(originalFileName);
            resume.setOriginalResumePath(filePath.toString());

            resume.setJobTitle(jobTitle);
            resume.setJobDescription(jobDescription);

            // Original uploaded resume
            resume.setResumeType("ORIGINAL");

            resume.setUser(existingUser);

            Resume savedResume = resumeRepository.save(resume);

            return ResponseEntity.ok(savedResume);

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to save resume: " + e.getMessage());

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to upload resume: " + e.getMessage());
        }
    }

    // ============================================================
    // GET USER RESUME HISTORY
    // ============================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Resume>> getUserResumes(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                resumeRepository.findByUserIdOrderByCreatedAtDesc(userId)
        );
    }

    // ============================================================
    // GET SINGLE RESUME
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getResume(
            @PathVariable Long id
    ) {

        return resumeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // ============================================================
    // GET SAVED RESUME FILE
    // Used for Re-Analyze
    // ============================================================

    @GetMapping("/{id}/file")
    public ResponseEntity<?> getResumeFile(
            @PathVariable Long id
    ) {

        try {

            Resume resume = resumeRepository.findById(id)
                    .orElse(null);

            if (resume == null) {
                return ResponseEntity.notFound().build();
            }

            String resumePath = resume.getOriginalResumePath();

            if (resumePath == null || resumePath.isBlank()) {
                return ResponseEntity.notFound().build();
            }

            Path filePath = Paths.get(resumePath);

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Resource resource =
                    new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.internalServerError()
                        .body("Resume file cannot be read.");
            }

            String fileName =
                    resume.getOriginalFileName() != null
                            ? resume.getOriginalFileName()
                            : "resume.pdf";

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + fileName + "\""
                    )
                    .body(resource);

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body(
                            "Failed to retrieve resume: "
                                    + e.getMessage()
                    );
        }
    }

    // ============================================================
    // DELETE RESUME
    // ============================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(
            @PathVariable Long id
    ) {

        Resume resume = resumeRepository.findById(id)
                .orElse(null);

        if (resume == null) {
            return ResponseEntity.notFound().build();
        }

        try {

            // ----------------------------------------------------
            // Delete original PDF
            // ----------------------------------------------------

            if (resume.getOriginalResumePath() != null &&
                    !resume.getOriginalResumePath().isBlank()) {

                Files.deleteIfExists(
                        Paths.get(
                                resume.getOriginalResumePath()
                        )
                );
            }

            // ----------------------------------------------------
            // Delete tailored DOCX if it exists
            // ----------------------------------------------------

            if (resume.getTailoredResumePath() != null &&
                    !resume.getTailoredResumePath().isBlank()) {

                Files.deleteIfExists(
                        Paths.get(
                                resume.getTailoredResumePath()
                        )
                );
            }

            // ----------------------------------------------------
            // Delete database record
            // ----------------------------------------------------

            resumeRepository.delete(resume);

            return ResponseEntity.ok(
                    "Resume deleted successfully"
            );

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body(
                            "Resume record could not be deleted: "
                                    + e.getMessage()
                    );
        }
    }
}