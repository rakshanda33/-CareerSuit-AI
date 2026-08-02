package com.example.loginbackend.repository;

import com.example.loginbackend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<user, Long> {


    user findByEmail(String email);


}