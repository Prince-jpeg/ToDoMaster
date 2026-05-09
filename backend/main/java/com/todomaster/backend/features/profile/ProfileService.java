package com.todomaster.backend.features.profile;

import org.springframework.stereotype.Service;
import com.todomaster.backend.features.user.User;
import com.todomaster.backend.features.user.UserRepository;

@Service
public class ProfileService {

    private final ProfileRepository profileRepo;
    private final UserRepository userRepo;

    public ProfileService(ProfileRepository profileRepo, UserRepository userRepo) {
        this.profileRepo = profileRepo;
        this.userRepo = userRepo;
    }

    public Profile getProfile(String id) {
        return profileRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public Profile getProfileByEmail(String email) {
        return profileRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public Profile updateProfile(String id, UpdateProfileRequest req) {
        Profile profile = profileRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (req.fullName != null) profile.setFullName(req.fullName);
        if (req.photoUrl != null) profile.setPhotoUrl(req.photoUrl);

        User user = profile.getUser();
        if (req.email != null) user.setEmail(req.email);
        if (req.password != null && !req.password.isEmpty()) user.setPassword(req.password);
        userRepo.save(user);

        return profileRepo.save(profile);
    }
}
