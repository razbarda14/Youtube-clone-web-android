package com.example.youtube.viesmodels;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.model.CreateVideoRequest;
import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.VideoRepository;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideoViewModel extends AndroidViewModel {
    private static final String TAG = VideoViewModel.class.getSimpleName();
    private VideoRepository videoRepository;

    public VideoViewModel(@NonNull Application application) {
        super(application);
        videoRepository = new VideoRepository();
    }

    public LiveData<List<VideoSession>> getMostViewedAndRandomVideos() {
        MutableLiveData<List<VideoSession>> liveData = new MutableLiveData<>();
        videoRepository.getMostViewedAndRandomVideos(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

    public LiveData<Void> incrementViews(String id) {
        MutableLiveData<Void> liveData = new MutableLiveData<>();
        videoRepository.incrementViews(id, new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }
}
