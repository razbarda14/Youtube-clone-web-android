package com.example.youtube.view_model;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.entities.Comment;
import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.CommentRepository;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentViewModel extends AndroidViewModel {
    private CommentRepository repository;

    public CommentViewModel(@NonNull Application application) {
        super(application);
        repository = new CommentRepository();
    }
    public LiveData<VideoSession> addCommentToVideo(String videoId, RequestBody commentJson) {
        MutableLiveData<VideoSession> liveData = new MutableLiveData<>();
        repository.addCommentToVideo(videoId, commentJson, new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    // Ensure the userId is a string
                    VideoSession videoSession = response.body();
                    if (videoSession != null) {
                        for (Comment comment : videoSession.getComments()) {
                            Object userId = comment.getUserId();
                            if (userId instanceof Map) {
                                Map userIdMap = (Map) userId;
                                if (userIdMap.containsKey("$oid")) {
                                    comment.setUserId(userIdMap.get("$oid").toString());
                                }
                            } else if (userId instanceof String) {
                                comment.setUserId((String) userId);
                            }
                        }
                    }
                    liveData.setValue(videoSession);
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }
    public LiveData<VideoSession> deleteComment(String videoId, String commentId) {
        MutableLiveData<VideoSession> videoSessionLiveData = new MutableLiveData<>();
        repository.deleteComment(videoId, commentId, new retrofit2.Callback<VideoSession>() {
            @Override
            public void onResponse(retrofit2.Call<VideoSession> call, retrofit2.Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    videoSessionLiveData.setValue(response.body());
                } else {
                    videoSessionLiveData.setValue(null);
                }
            }

            @Override
            public void onFailure(retrofit2.Call<VideoSession> call, Throwable t) {
                videoSessionLiveData.setValue(null);
            }
        });
        return videoSessionLiveData;
    }
}
