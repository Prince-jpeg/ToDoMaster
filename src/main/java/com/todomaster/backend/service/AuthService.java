package com.todomaster.backend.service;

import org.springframework.stereotype.Service;
import com.todomaster.backend.entity.User;
import com.todomaster.backend.entity.Profile;
import com.todomaster.backend.repository.UserRepository;
import com.todomaster.backend.repository.ProfileRepository;
import com.todomaster.backend.dto.LoginRequest;
import com.todomaster.backend.dto.RegisterRequest;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final ProfileRepository profileRepo;

    public AuthService(UserRepository userRepo, ProfileRepository profileRepo) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
    }

    public String register(RegisterRequest req) {
        User user = new User();
        user.setEmail(req.email);
        user.setPassword(req.password);
        userRepo.save(user);

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFullName(req.fullName);
        profile.setPhotoUrl(req.photoUrl);
        profileRepo.save(profile);

        return "Registered successfully";
    }

    public String login(LoginRequest req) {
        User user = userRepo.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(req.password)) {
            throw new RuntimeException("Invalid password");
        }

        return "Login successful";
    }
}