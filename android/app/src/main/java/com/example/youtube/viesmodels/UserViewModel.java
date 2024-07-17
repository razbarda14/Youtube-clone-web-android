package com.example.youtube.viesmodels;
import android.util.Log;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.annotation.NonNull;
import android.app.Application;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.UserIdResponse;
import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.UserRepository;

public class UserViewModel extends AndroidViewModel {
    private static final String TAG = UserViewModel.class.getSimpleName();
    private UserRepository mRepository;

    public UserViewModel(@NonNull Application application) {
        super(application);
        mRepository = new UserRepository();
    }
    public LiveData<VideoSession> createVideo(String userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic) {
        MutableLiveData<VideoSession> liveData = new MutableLiveData<>();
        mRepository.createVideo(userId, videoFile, thumbnailFile, title, description, topic, new Callback<VideoSession>() {
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
    public LiveData<User> registerUser(RegisterUserRequest registerRequest) {
        MutableLiveData<User> liveData = new MutableLiveData<>();
        mRepository.registerUser(registerRequest, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                    Log.d(TAG, "Registration successful: " + response.body().toString());
                } else {
                    liveData.setValue(null);
                    Log.e(TAG, "Registration failed with response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                liveData.setValue(null);
                Log.e(TAG, "Registration failed: " + t.getMessage());
            }
        });
        return liveData;
    }
    public LiveData<UserIdResponse> getUserIdByUsername(String username) {
        MutableLiveData<UserIdResponse> liveData = new MutableLiveData<>();
        mRepository.getUserIdByUsername(username, new Callback<UserIdResponse>() {
            @Override
            public void onResponse(Call<UserIdResponse> call, Response<UserIdResponse> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<UserIdResponse> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

}
