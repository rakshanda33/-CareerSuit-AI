package com.example.loginbackend.repository;

import com.example.loginbackend.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserIdOrderByCreatedAtDesc(Long userId);
}