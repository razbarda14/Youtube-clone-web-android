package com.example.youtube;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
