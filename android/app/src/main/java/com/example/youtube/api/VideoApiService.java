package com.example.youtube.api;

import com.example.youtube.entities.Comment;
import com.example.youtube.model.VideoSession;

import java.util.List;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface VideoApiService {

    @GET("api/videos")
    Call<List<VideoSession>> getMostViewedAndRandomVideos();

    @GET("api/videos/{id}/uploader")
    Call<VideoSession> getVideoWithUploaderNameById(@Path("id") String id);

    @GET("api/videos/{id}/getUploaderId")
    Call<String> getUploaderId(@Path("id") String id);

    @PATCH("api/videos/increment-views/{id}")
    Call<VideoSession> incrementViews(@Path("id") String id);

    @POST("api/videos/{id}/comments")
    Call<VideoSession> addCommentToVideo(@Path("id") String id, @Body RequestBody commentJson);


    @DELETE("api/videos/{id}/comments/{commentId}")
    Call<VideoSession> deleteCommentFromVideo(@Path("id") String id, @Path("commentId") String commentId);

    @PUT("api/videos/{id}/comments/{commentId}")
    Call<VideoSession> editCommentInVideo(@Path("id") String id, @Path("commentId") String commentId, @Body Comment newComment);

}
