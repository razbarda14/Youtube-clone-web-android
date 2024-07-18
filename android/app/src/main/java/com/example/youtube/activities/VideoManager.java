package com.example.youtube.activities;

import com.example.youtube.entities.Video;

import java.util.ArrayList;
import java.util.List;

public class VideoManager {
    private static List<Video> videoList = new ArrayList<>();

    public static void addVideo(Video video) {
        videoList.add(video);
    }

    public static List<Video> getVideoList() {
        return videoList;
    }

    public static Video getVideoById(String id) {
        for (Video video : videoList) {
            if (video.getId().equals(id)) {
                return video;
            }
        }
        return null;
    }
}
