package server.view_model;
import android.util.Log;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.annotation.NonNull;
import android.app.Application;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import server.model.LoginRequest;
import server.model.LoginResponse;
import server.model.RegisterUserRequest;
import server.model.User;
import server.repository.UserRepository;

public class UserViewModel extends AndroidViewModel {
    private static final String TAG = UserViewModel.class.getSimpleName();
    private UserRepository mRepository;

    public UserViewModel(@NonNull Application application) {
        super(application);
        mRepository = new UserRepository();
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

    public LiveData<LoginResponse> loginUser(LoginRequest loginRequest) {
        MutableLiveData<LoginResponse> liveData = new MutableLiveData<>();
        mRepository.loginUser(loginRequest, new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                    Log.d(TAG, "Login successful: " + response.body().toString());
                } else {
                    liveData.setValue(null);
                    Log.e(TAG, "Login failed with response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                liveData.setValue(null);
                Log.e(TAG, "Login failed: " + t.getMessage());
            }
        });
        return liveData;
    }
}
