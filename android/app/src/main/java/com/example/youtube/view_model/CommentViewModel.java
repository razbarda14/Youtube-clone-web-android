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
                    liveData.setValue(response.body());
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

}
