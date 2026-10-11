package com.example.loginbackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalFileName;

    private String originalResumePath;

    private String tailoredResumePath;

    private String tailoredFileName;

    private String resumeType;

    private String jobTitle;

    private String companyName;

    @Column(length = 4000)
    private String jobDescription;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private user user;

    public Resume() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getOriginalResumePath() {
        return originalResumePath;
    }

    public void setOriginalResumePath(String originalResumePath) {
        this.originalResumePath = originalResumePath;
    }

    public String getTailoredResumePath() {
        return tailoredResumePath;
    }

    public void setTailoredResumePath(String tailoredResumePath) {
        this.tailoredResumePath = tailoredResumePath;
    }

    public String getTailoredFileName() {
        return tailoredFileName;
    }

    public void setTailoredFileName(String tailoredFileName) {
        this.tailoredFileName = tailoredFileName;
    }

    public String getResumeType() {
        return resumeType;
    }

    public void setResumeType(String resumeType) {
        this.resumeType = resumeType;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public user getUser() {
        return user;
    }

    public void setUser(user user) {
        this.user = user;
    }
}