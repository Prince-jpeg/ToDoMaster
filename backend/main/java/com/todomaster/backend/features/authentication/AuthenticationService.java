package com.todomaster.backend.features.authentication;

import org.springframework.stereotype.Service;
import com.todomaster.backend.features.user.User;
import com.todomaster.backend.features.user.UserRepository;
import com.todomaster.backend.features.profile.Profile;
import com.todomaster.backend.features.profile.ProfileRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepo;
    private final ProfileRepository profileRepo;

    public AuthenticationService(UserRepository userRepo, ProfileRepository profileRepo) {
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
