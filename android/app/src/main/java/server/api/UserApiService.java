package server.api;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;
import server.model.CreateVideoRequest;
import server.model.DisplayNameResponse;
import server.model.ImagePathResponse;
import server.model.LoginRequest;
import server.model.LoginResponse;
import server.model.RegisterUserRequest;
import server.model.User;
import server.model.UserIdResponse;
import server.model.UserUpdateRequest;
import server.model.Video;

public interface UserApiService {
    @GET("api/users")
    Call<List<User>> getUsers();

    @POST("api/users")
    Call<User> createUser(@Body User user);

    @GET("api/users/getUserId")
    Call<UserIdResponse> getUserIdByUsername(@Query("username") String username);

    @GET("api/users/{id}")
    Call<User> getUserById(@Path("id") String id);

    @PUT("api/users/{id}")
    Call<User> updateUser(@Path("id") String id, @Body UserUpdateRequest updateRequest);

    @DELETE("api/users/{id}")
    Call<Void> deleteUser(@Path("id") String id);

    @GET("/api/users/{id}/getDisplayName")
    Call<User> getUserDisplayName(@Path("id") String userId);

    @GET("api/users/{id}/getImagePath")
    Call<ImagePathResponse> getUserImagePath(@Path("id") String id);

    @POST("api/users/register")
    Call<User> registerUser(@Body RegisterUserRequest registerRequest);

    @POST("api/tokens")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    @GET("api/users/{id}/videos")
    Call<List<Video>> getVideosByUploader(@Path("id") String id);

    @POST("api/users/{id}/videos")
    Call<Video> createVideo(@Path("id") String id, @Body CreateVideoRequest createVideoRequest);

    @GET("auth/verify-user")
    Call<User> verifyUser(@Header("Authorization") String token);
}
