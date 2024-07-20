package com.example.youtube.entities;

import com.google.gson.annotations.SerializedName;

import java.util.Map;

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
    public String getUserId() {
        if (userId instanceof String) {
            return (String) userId;
        } else if (userId instanceof Map) {
            Map<String, String> userIdMap = (Map<String, String>) userId;
            return userIdMap.get("$oid");
        }
        return null;
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