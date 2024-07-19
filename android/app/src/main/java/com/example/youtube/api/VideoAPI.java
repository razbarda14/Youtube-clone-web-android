package com.example.youtube.api;

import android.util.Log;

import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideoAPI {
    private static final String TAG = VideoAPI.class.getSimpleName();
    private VideoApiService apiService;

    public VideoAPI() {
        apiService = RetrofitInstance.getRetrofitInstance().create(VideoApiService.class);
    }
    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        Call<List<VideoSession>> call = apiService.getMostViewedAndRandomVideos();
        call.enqueue(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching videos failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching videos failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {
                Log.e(TAG, "Fetching videos failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void incrementViews(String id, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.incrementViews(id);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Incrementing views failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Incrementing views failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Incrementing views failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }
}
