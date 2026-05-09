package com.todomaster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todomaster.backend.entity.Profile;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, String> {
    Optional<Profile> findByUserEmail(String email);
}