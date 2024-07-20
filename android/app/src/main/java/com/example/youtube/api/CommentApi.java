package com.example.youtube.api;

import android.util.Log;

import com.example.youtube.entities.Comment;
import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;

import java.io.IOException;
import java.util.Map;

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
        Log.d(TAG, "commentJson is : " + commentJson);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    Log.d(TAG, "Comment added successfully: " + response.body().toString()); // Log the response body

                    // Parse the response to ensure userId is a string
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
    public void editCommentInVideo(String videoId, String commentId, Comment newComment, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.editCommentInVideo(videoId, commentId, newComment);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    Log.d(TAG, "Comment edited successfully: " + response.body());
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Editing comment failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Editing comment failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Editing comment failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

}
