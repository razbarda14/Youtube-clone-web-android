package com.example.youtube.room;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.youtube.model.VideoSession;

import java.util.List;

@Dao
public interface VideoDao {
    @Query("SELECT * FROM videosession")
    List<VideoSession> index();

    @Query("SELECT * FROM videosession WHERE id = :id")
    VideoSession get(String id);

    @Query("DELETE FROM videosession")
    void clear();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertList(List<VideoSession> videoSessions);

    @Insert
    void insert(VideoSession... videoSessions);
}
