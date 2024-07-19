package com.example.youtube.api;

import android.util.Log;

import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;

import java.io.IOException;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentApi {
    private static final String TAG = CommentApi.class.getSimpleName();
    private VideoApiService apiService;

    public CommentApi() {
        apiService = RetrofitInstance.getRetrofitInstance().create(VideoApiService.class);
    }

    public void addCommentToVideo(String videoId, RequestBody commentJson, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.addCommentToVideo(videoId, commentJson);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    Log.d(TAG, "Comment added successfully");
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Adding comment failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Adding comment failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Adding comment failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


}
