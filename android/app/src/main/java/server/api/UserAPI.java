package server.api;

import android.util.Log;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import server.model.LoginRequest;
import server.model.LoginResponse;
import server.model.RegisterUserRequest;
import server.utils.RetrofitInstance;
import server.model.User;

public class UserAPI {
    private static final String TAG = UserAPI.class.getSimpleName();
    private UserApiService apiService;

    public UserAPI() {
        apiService = RetrofitInstance.getRetrofitInstance().create(UserApiService.class);
    }

    public void registerUser(RegisterUserRequest registerRequest, Callback<User> callback) {
        RequestBody username = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getUsername());
        RequestBody displayName = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getDisplayName());
        RequestBody password = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getPassword());

        MultipartBody.Part imagePart = null;
        if (registerRequest.getImage() != null && !registerRequest.getImage().isEmpty()) {
            File imageFile = new File(registerRequest.getImage());
            RequestBody imageBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
            imagePart = MultipartBody.Part.createFormData("photo", imageFile.getName(), imageBody);
        }

        Call<User> call = apiService.registerUser(username, displayName, password, imagePart);
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

    public void loginUser(LoginRequest loginRequest, Callback<LoginResponse> callback) {
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Login failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Login failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Log.e(TAG, "Login failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void verifyUser(String token, Callback<User> callback) {
        Call<User> call = apiService.verifyUser("Bearer " + token);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching user details failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching user details failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG, "Fetching user details failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }
}
