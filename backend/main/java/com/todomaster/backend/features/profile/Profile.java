package com.todomaster.backend.features.profile;

import jakarta.persistence.*;
import com.todomaster.backend.features.user.User;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    private String id;

    private String fullName;

    @Column(columnDefinition = "TEXT")
    private String photoUrl;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
