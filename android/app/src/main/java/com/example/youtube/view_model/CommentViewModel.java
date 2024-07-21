package com.example.youtube.view_model;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.CommentRepository;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentViewModel extends AndroidViewModel {
    private CommentRepository commentRepository;

    public CommentViewModel(@NonNull Application application) {
        super(application);
        commentRepository = new CommentRepository();
    }

    public LiveData<VideoSession> deleteComment(String videoId, String commentId) {
        MutableLiveData<VideoSession> videoSessionLiveData = new MutableLiveData<>();
        commentRepository.deleteComment(videoId, commentId, new retrofit2.Callback<VideoSession>() {
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