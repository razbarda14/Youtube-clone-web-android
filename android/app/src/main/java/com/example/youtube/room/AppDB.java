package com.example.youtube.room;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.youtube.model.VideoSession;

@Database(entities = {VideoSession.class}, version = 1)
@TypeConverters({CommentTypeConverter.class})
public abstract class AppDB extends RoomDatabase {
    public abstract VideoDao videoDao();
}
