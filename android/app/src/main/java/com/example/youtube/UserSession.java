package com.example.youtube;

public class UserSession {
    private static UserSession instance;
    private String username;
    private String displayName;
    private String profilePhoto;

    private UserSession() { }

    public static synchronized UserSession getInstance() {
        if (instance == null) {
            instance = new UserSession();
        }
        return instance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public void clearSession() {
        username = null;
        displayName = null;
        profilePhoto = null;
    }

    public boolean isLoggedIn() {
        return username != null && displayName != null;
    }
}
