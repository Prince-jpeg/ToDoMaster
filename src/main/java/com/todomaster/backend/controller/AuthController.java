package com.todomaster.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.todomaster.backend.service.AuthService;
import com.todomaster.backend.dto.LoginRequest;
import com.todomaster.backend.dto.RegisterRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        return service.register(req);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}