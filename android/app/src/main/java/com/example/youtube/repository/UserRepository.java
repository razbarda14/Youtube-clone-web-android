package com.example.youtube.repository;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.api.UserAPI;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.UserDisplayNameResponse;
import com.example.youtube.model.VideoSession;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository {
    private UserAPI userAPI;

    public UserRepository(Context context) {
        userAPI = new UserAPI(context);
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



    public void getUserDisplayName(String userId, Callback<UserDisplayNameResponse> callback) {
        userAPI.getUserDisplayName(userId, callback);
    }

    public void getVideoById(String userId, String videoId, Callback<VideoSession> callback) {
        userAPI.getVideoById(userId, videoId, callback);
    }

    public LiveData<Boolean> updateDisplayName(String token, String userId, String displayName) {
        MutableLiveData<Boolean> result = new MutableLiveData<>();
        userAPI.updateDisplayName(token, userId, displayName, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    result.setValue(true);
                } else {
                    result.setValue(false);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                result.setValue(false);
            }
        });
        return result;
    }

    public void deleteUser(String token, String userId, Callback<Void> callback) {
        userAPI.deleteUser(token, userId, callback);
    }

    public LiveData<User> getUserById(String userId) {
        MutableLiveData<User> userData = new MutableLiveData<>();
        userAPI.getUserById(userId, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    userData.setValue(response.body());
                } else {
                    userData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                userData.setValue(null);
            }
        });
        return userData;
    }

    public void createVideo(RequestBody userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic, Callback<VideoSession> callback) {
        userAPI.createVideo(userId, videoFile, thumbnailFile, title, description, topic, callback);
    }

}