package com.example.youtube.repository;

import com.example.youtube.model.CreateVideoRequest;
import com.example.youtube.model.VideoSession;

import retrofit2.Callback;
import com.example.youtube.api.VideoAPI;

import java.util.List;

public class VideoRepository {
    private VideoAPI videoAPI;

    public VideoRepository() {
        videoAPI = new VideoAPI();
    }

    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        videoAPI.getMostViewedAndRandomVideos(callback);
    }

    public void incrementViews(String id, Callback<Void> callback) {
        videoAPI.incrementViews(id, callback);
    }

    public void updateVideoDetails(VideoSession video) {
        videoAPI.updateVideoDetails(video);
    }

    public void deleteVideoById(String videoId) {
        videoAPI.deleteVideoById(videoId);
    }
}
