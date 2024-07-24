package com.example.youtube.repository;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.api.VideoAPI;
import com.example.youtube.model.VideoSession;

import java.util.LinkedList;
import java.util.List;

import retrofit2.Callback;

public class VideoRepository {
    private VideoAPI videoAPI;
    private VideoListData videoListData;

    public VideoRepository() {
        videoAPI = new VideoAPI();
        videoListData = new VideoListData();
    }

    class VideoListData extends MutableLiveData<List<VideoSession>> {
        public VideoListData() {
            super();
            List<VideoSession> videoList = new LinkedList<VideoSession>();
            setValue(videoList);
        }

        @Override
        protected void onActive(){
            super.onActive();
            videoAPI.getMostViewedAndRandomVideos(this);

//            new Thread(()->{
//                videoSessionListData.postValue();
//            }).start();
        }
    }

    public LiveData<List<VideoSession>> getAll() {
        return videoListData;
    }

    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        videoAPI.getMostViewedAndRandomVideos(callback);
    }

    public void incrementViews(String id, Callback<VideoSession> callback) {
        videoAPI.incrementViews(id, callback);
    }

    public void updateVideoDetails(VideoSession video) {
        videoAPI.updateVideoDetails(video);
    }

    public void deleteVideoById(String videoId) {
        videoAPI.deleteVideoById(videoId);
    }

    public void getUserVideos(String userId, Callback<List<VideoSession>> callback) {
        videoAPI.getUserVideos(userId, callback);
    }

}
