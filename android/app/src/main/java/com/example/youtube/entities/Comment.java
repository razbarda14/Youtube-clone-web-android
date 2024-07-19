
package com.example.youtube.entities;

public class Comment {
    private String userId;
    private String comment;
    private String displayName;

    // Default constructor for deserialization
    public Comment() {
    }

    // Constructor
    public Comment(String userId, String comment) {
        this.userId = userId;
        this.comment = comment;
        this.displayName = null; // Initialize with null
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
