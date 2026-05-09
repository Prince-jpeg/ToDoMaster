package com.todomaster.backend.features.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, String> {
    Optional<Profile> findByUserEmail(String email);
}
