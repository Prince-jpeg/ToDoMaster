package com.todomaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todomaster.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}