package com.example.youtube.api;
import android.util.Log;
import java.io.IOException;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.UserIdResponse;
import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;
import com.example.youtube.model.User;

public class UserAPI {
    private static final String TAG = UserAPI.class.getSimpleName();
    private UserApiService apiService;

    public UserAPI() {
        apiService = RetrofitInstance.getRetrofitInstance().create(UserApiService.class);
    }
    public void createVideo(String userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.createVideo(userId, videoFile, thumbnailFile, title, description, topic);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Video creation failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Video creation failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Video creation failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }
    public void registerUser(RegisterUserRequest registerRequest, Callback<User> callback) {
        Call<User> call = apiService.registerUser(registerRequest);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Registration failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Registration failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG, "Registration failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }
    public void getUserIdByUsername(String username, Callback<UserIdResponse> callback) {
        Call<UserIdResponse> call = apiService.getUserIdByUsername(username);
        call.enqueue(new Callback<UserIdResponse>() {
            @Override
            public void onResponse(Call<UserIdResponse> call, Response<UserIdResponse> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    callback.onFailure(call, new Throwable("Failed to get user ID"));
                }
            }

            @Override
            public void onFailure(Call<UserIdResponse> call, Throwable t) {
                callback.onFailure(call, t);
            }
        });
    }

}
