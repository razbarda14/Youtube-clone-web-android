package server.repository;

import retrofit2.Callback;
import server.api.UserAPI;
import server.model.LoginRequest;
import server.model.LoginResponse;
import server.model.RegisterUserRequest;
import server.model.User;

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
}
