//package com.example.youtube.entities;
//
//public class Comment {
//    private String userName;
//    private String commentText;
//
//    public Comment(String userName, String commentText) {
//        this.userName = userName;
//        this.commentText = commentText;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public String getCommentText() {
//        return commentText;
//    }
//
//    public void setCommentText(String commentText) {
//        this.commentText = commentText;
//    }
//}
package com.example.youtube.entities;

public class Comment {
    private String userId;
    private String comment;

    // Default constructor for deserialization
    public Comment() {
    }

    // Constructor
    public Comment(String userId, String comment) {
        this.userId = userId;
        this.comment = comment;
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
}
