package com.example.youtube.repository;

import com.example.youtube.api.VideoAPI;
import com.example.youtube.model.VideoSession;

import java.util.List;

import retrofit2.Callback;

public class VideoRepository {
    private VideoAPI videoAPI;

    public VideoRepository() {
        videoAPI = new VideoAPI();
    }

    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        videoAPI.getMostViewedAndRandomVideos(callback);
    }

    public void incrementViews(String id, Callback<VideoSession> callback) {
        videoAPI.incrementViews(id, callback);
    }

    public void updateVideoDetails(VideoSession video) {
        videoAPI.updateVideoDetails(video);
    }

    public void deleteVideoById(String videoId) {
        videoAPI.deleteVideoById(videoId);
    }
}
