package com.example.youtube;

import java.util.List;

public class Video {
    private String id;
    private String title;
    private String videoUrl;
    private String imageUrl;
    private int numLikes;
    private int numViews;
    private String uploadDate;
    private String description;
    private String topic;
    private boolean isLiked;
    private String channel;
    private List<String> comments;

    public Video(String id, String title, String videoUrl, String imageUrl, int numLikes, int numViews, String uploadDate, String description, String topic, boolean isLiked, String channel, List<String> comments) {
        this.id = id;
        this.title = title;
        this.videoUrl = videoUrl;
        this.imageUrl = imageUrl;
        this.numLikes = numLikes;
        this.numViews = numViews;
        this.uploadDate = uploadDate;
        this.description = description;
        this.topic = topic;
        this.isLiked = isLiked;
        this.channel = channel;
        this.comments = comments;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getNumLikes() {
        return numLikes;
    }

    public int getNumViews() {
        return numViews;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public String getDescription() {
        return description;
    }

    public String getTopic() {
        return topic;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public String getChannel() {
        return channel;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description=description;
    }
}
