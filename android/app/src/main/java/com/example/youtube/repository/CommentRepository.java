package com.example.youtube.repository;

import com.example.youtube.api.CommentApi;
import com.example.youtube.model.VideoSession;

import okhttp3.RequestBody;
import retrofit2.Callback;

public class CommentRepository {
    private CommentApi commentApi;

    public CommentRepository() {
        commentApi = new CommentApi();
    }

    public void addCommentToVideo(String videoId, RequestBody commentJson, Callback<VideoSession> callback) {
        commentApi.addCommentToVideo(videoId, commentJson, callback);
    }


}
