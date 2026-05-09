package com.todomaster.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.todomaster.backend.service.ProfileService;
import com.todomaster.backend.entity.Profile;
import com.todomaster.backend.dto.UpdateProfileRequest;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"}, allowCredentials = "true")
@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public Profile getProfile(@PathVariable String id) {
        return service.getProfile(id);
    }

    @GetMapping("/by-email")
    public Profile getProfileByEmail(@RequestParam String email) {
        return service.getProfileByEmail(email);
    }

    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable String id, @RequestBody UpdateProfileRequest req) {
        System.out.println("updateProfile called id=" + id + " photoUrl=" + (req.photoUrl != null ? "[length=" + req.photoUrl.length() + "]" : "null"));
        return service.updateProfile(id, req);
    }
}