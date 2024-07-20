package com.example.youtube.repository;

import com.example.youtube.api.UserAPI;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.VideoSession;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Callback;

public class UserRepository {
    private UserAPI userAPI;

    public UserRepository() {
        userAPI = new UserAPI();
    }

    public void registerUser(RegisterUserRequest registerRequest, Callback<User> callback) {
        userAPI.registerUser(registerRequest, callback);
    }

    public void loginUser(LoginRequest loginRequest, Callback<LoginResponse> callback) {
        userAPI.loginUser(loginRequest, callback);
    }

    public void verifyUser(String token, Callback<User> callback) {
        userAPI.verifyUser(token, callback);
    }

    public void createVideo(RequestBody userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic, Callback<VideoSession> callback) {
        userAPI.createVideo(userId, videoFile, thumbnailFile, title, description, topic, callback);
    }
    public void getUserDisplayName(String userId, Callback<String> callback) {
        userAPI.getUserDisplayName(userId, callback);
    }
    public void getVideoById(String userId, String videoId, Callback<VideoSession> callback) {
        userAPI.getVideoById(userId, videoId, callback);
    }
}
