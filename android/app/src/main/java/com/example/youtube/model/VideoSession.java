package com.example.youtube.model;

import com.example.youtube.entities.Comment;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class VideoSession {
    @SerializedName("_id")
    private String id;
    private String title;
    private String uploaderId;
    private String uploaderDisplayName;
    private String description;
    private int viewsCount;
    private String dateUploaded;
    private String videoPath;
    private String thumbnailPath;
    private String topic;
    private int likes;
    private List<Comment> comments;
    private List<String> likedBy;

    public VideoSession(String id, String title, String uploaderId, String description, int viewsCount,
                        String dateUploaded, String videoPath, String thumbnailPath, String topic, int likes,
                        List<Comment> comments, List<String> likedBy) {
        this.id = id;
        this.title = title;
        this.uploaderId = uploaderId;
        this.uploaderDisplayName = null;
        this.description = description;
        this.viewsCount = viewsCount;
        this.dateUploaded = dateUploaded;
        this.videoPath = videoPath;
        this.thumbnailPath = thumbnailPath;
        this.topic = topic;
        this.likes = likes;
        this.comments = comments;
        this.likedBy = likedBy;
    }

    public VideoSession(){
        this.id = null;
        this.title = null;
        this.uploaderId = null;
        this.description = null;
        this.viewsCount = 0;
        this.dateUploaded = null;
        this.videoPath = null;
        this.thumbnailPath = null;
        this.topic = null;
        this.likes = 0;
        this.comments = null;
        this.likedBy = null;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUploaderId() {
        return uploaderId;
    }

    public void setUploaderId(String uploaderId) {
        this.uploaderId = uploaderId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(int viewsCount) {
        this.viewsCount = viewsCount;
    }

    public String getDateUploaded() {
        return dateUploaded;
    }

    public void setDateUploaded(String dateUploaded) {
        this.dateUploaded = dateUploaded;
    }

    public String getVideoPath() {
        return videoPath;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public String getThumbnailPath() {
        return thumbnailPath;
    }

    public void setThumbnailPath(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<String> getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(List<String> likedBy) {
        this.likedBy = likedBy;
    }

    public String getUploaderDisplayName() {
        return uploaderDisplayName;
    }

    public void setUploaderDisplayName(String uploaderDisplayName) {
        this.uploaderDisplayName = uploaderDisplayName;
    }
}
