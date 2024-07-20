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

    public void deleteCommentFromVideo(String videoId, String commentId, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.deleteCommentFromVideo(videoId, commentId);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    Log.d(TAG, "Comment deleted successfully: " + response.body());
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Deleting comment failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Deleting comment failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Deleting comment failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


}