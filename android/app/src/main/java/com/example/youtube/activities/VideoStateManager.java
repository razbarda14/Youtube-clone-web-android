package com.example.youtube.activities;

import com.example.youtube.entities.Comment;
import com.example.youtube.entities.Video;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VideoStateManager {
    private static VideoStateManager instance;
    private Map<String, Integer> likeCounts;
    private Map<String, Map<String, Boolean>> userLikes; // Map of videoId to userId to like state
    private Map<String, Map<String, Boolean>> userDislikes; // Map of videoId to userId to dislike state
    private Map<String, List<Comment>> comments;
    private Map<String, Integer> viewCounts;
    private Map<String, String> titleMap = new HashMap<>();
    private Map<String, String> descriptionMap = new HashMap<>();
    private Map<String, Video> videoMap = new HashMap<>();
    private List<Video> allVideos = new ArrayList<>(); // Global list of all videos

    private VideoStateManager() {
        likeCounts = new HashMap<>();
        userLikes = new HashMap<>();
        userDislikes = new HashMap<>();
        comments = new HashMap<>();
        viewCounts = new HashMap<>();
    }
    // Add to VideoStateManager.java

    public void initializeViewCount(String videoId, int defaultCount) {
        if (!viewCounts.containsKey(videoId)) {
            viewCounts.put(videoId, defaultCount);
        }
    }
    public void addVideo(Video video) {
        videoMap.put(video.getId(), video);
        allVideos.add(video); // Add to the global list
    }
    public int getViewCount(String videoId) {
        return viewCounts.getOrDefault(videoId, 0);
    }

    public void incrementViewCount(String videoId) {
        int currentCount = viewCounts.getOrDefault(videoId, 0);
        viewCounts.put(videoId, currentCount + 1);
    }
    public static VideoStateManager getInstance() {
        if (instance == null) {
            instance = new VideoStateManager();
        }
        return instance;
    }

    public int getLikeCount(String videoId) {
        return likeCounts.getOrDefault(videoId, 0);
    }

    public void setLikeCount(String videoId, int count) {
        likeCounts.put(videoId, count);
    }

    public boolean isLikedByUser(String videoId, String userId) {
        return userLikes.containsKey(videoId) && userLikes.get(videoId).getOrDefault(userId, false);
    }

    public void setLikedByUser(String videoId, String userId, boolean isLiked) {
        userLikes.putIfAbsent(videoId, new HashMap<>());
        userLikes.get(videoId).put(userId, isLiked);
    }

    public boolean isDislikedByUser(String videoId, String userId) {
        return userDislikes.containsKey(videoId) && userDislikes.get(videoId).getOrDefault(userId, false);
    }

    public void setDislikedByUser(String videoId, String userId, boolean isDisliked) {
        userDislikes.putIfAbsent(videoId, new HashMap<>());
        userDislikes.get(videoId).put(userId, isDisliked);
    }

    public void initializeLikeCount(String videoId, int defaultCount) {
        if (!likeCounts.containsKey(videoId)) {
            likeCounts.put(videoId, defaultCount);
        }
    }

    public List<Comment> getComments(String videoId) {
        return comments.getOrDefault(videoId, new ArrayList<>());
    }

    public void addComment(String videoId, Comment comment) {
        comments.putIfAbsent(videoId, new ArrayList<>());
        comments.get(videoId).add(comment);
    }

    public void removeComment(String videoId, int position) {
        if (comments.containsKey(videoId)) {
            comments.get(videoId).remove(position);
        }
    }

    public void editComment(String videoId, int position, String newCommentText) {
        if (comments.containsKey(videoId) && position < comments.get(videoId).size()) {
            comments.get(videoId).get(position).setComment(newCommentText);
        }
    }
    public void setTitle(String videoId, String title) {
        titleMap.put(videoId, title);
        if (videoMap.containsKey(videoId)) {
            videoMap.get(videoId).setTitle(title);
        }
    }

    public String getTitle(String videoId) {
        return titleMap.getOrDefault(videoId, videoMap.get(videoId) != null ? videoMap.get(videoId).getTitle() : "");
    }

    public void setDescription(String videoId, String description) {
        descriptionMap.put(videoId, description);
        if (videoMap.containsKey(videoId)) {
            videoMap.get(videoId).setDescription(description);
        }
    }

    public String getDescription(String videoId) {
        return descriptionMap.getOrDefault(videoId, videoMap.get(videoId) != null ? videoMap.get(videoId).getDescription() : "");
    }
    // Add this method to get all videos
    public List<Video> getAllVideos() {
        return new ArrayList<>(videoMap.values());
    }
}
