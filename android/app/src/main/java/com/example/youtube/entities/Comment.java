package com.example.youtube.entities;

import com.google.gson.annotations.SerializedName;

public class Comment {
    @SerializedName("_id")
    private String commentId;
    @SerializedName("userId")
    private Object  userId;
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

    // Constructor
    public Comment(String userId, String comment, String commentId) {
        this.userId = userId;
        this.comment = comment;
        this.commentId = commentId;
        this.displayName = null; // Initialize with null
    }

    // Getters and Setters
    public Object getUserId() {
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

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }
}