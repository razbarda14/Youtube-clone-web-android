package data;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.youtube.Comment;

import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "youtube.db";
    public static final String TABLE_USERS = "users";
    public static final String TABLE_COMMENTS = "comments";

    // User table columns
    public static final String COL_USER_ID = "ID";
    public static final String COL_USER_USERNAME = "USERNAME";
    public static final String COL_USER_PASSWORD = "PASSWORD";
    public static final String COL_USER_DISPLAY_NAME = "DISPLAY_NAME";
    public static final String COL_USER_PROFILE_PHOTO = "PROFILE_PHOTO";

    // Comment table columns
    public static final String COL_COMMENT_ID = "ID";
    public static final String COL_COMMENT_VIDEO_ID = "VIDEO_ID";
    public static final String COL_COMMENT_USER_NAME = "USER_NAME";
    public static final String COL_COMMENT_TEXT = "COMMENT_TEXT";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE " + TABLE_USERS + " (ID INTEGER PRIMARY KEY AUTOINCREMENT, USERNAME TEXT, PASSWORD TEXT, DISPLAY_NAME TEXT, PROFILE_PHOTO TEXT)");
        db.execSQL("CREATE TABLE " + TABLE_COMMENTS + " (ID INTEGER PRIMARY KEY AUTOINCREMENT, VIDEO_ID TEXT, USER_NAME TEXT, COMMENT_TEXT TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_COMMENTS);
        onCreate(db);
    }

    public boolean insertUser(String username, String password, String displayName, String profilePhoto) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_USER_USERNAME, username);
        contentValues.put(COL_USER_PASSWORD, password);
        contentValues.put(COL_USER_DISPLAY_NAME, displayName);
        contentValues.put(COL_USER_PROFILE_PHOTO, profilePhoto);
        long result = db.insert(TABLE_USERS, null, contentValues);
        return result != -1;
    }

    public boolean checkUser(String username, String password) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_USERS + " WHERE USERNAME=? AND PASSWORD=?", new String[]{username, password});
        return cursor.getCount() > 0;
    }

    public boolean checkUsernameExists(String username) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_USERS + " WHERE USERNAME=?", new String[]{username});
        boolean exists = cursor.getCount() > 0;
        cursor.close();
        return exists;
    }

    public boolean checkDisplayNameExists(String displayName) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_USERS + " WHERE DISPLAY_NAME=?", new String[]{displayName});
        boolean exists = cursor.getCount() > 0;
        cursor.close();
        return exists;
    }

    public User getUserDetails(String username) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_USERS + " WHERE USERNAME=?", new String[]{username});
        if (cursor != null && cursor.moveToFirst()) {
            @SuppressLint("Range")
            String displayName = cursor.getString(cursor.getColumnIndex(COL_USER_DISPLAY_NAME));
            @SuppressLint("Range")
            String profilePhoto = cursor.getString(cursor.getColumnIndex(COL_USER_PROFILE_PHOTO));
            cursor.close();
            return new User(username, displayName, profilePhoto);
        }
        cursor.close();
        return null;
    }

    // Add a comment to the database
    public boolean insertComment(String videoId, String userName, String commentText) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_COMMENT_VIDEO_ID, videoId);
        contentValues.put(COL_COMMENT_USER_NAME, userName);
        contentValues.put(COL_COMMENT_TEXT, commentText);
        long result = db.insert(TABLE_COMMENTS, null, contentValues);
        return result != -1;
    }

    // Get comments for a video
    public List<Comment> getComments(String videoId) {
        List<Comment> comments = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_COMMENTS + " WHERE VIDEO_ID=?", new String[]{videoId});
        if (cursor != null && cursor.moveToFirst()) {
            do {
                @SuppressLint("Range")
                String userName = cursor.getString(cursor.getColumnIndex(COL_COMMENT_USER_NAME));
                @SuppressLint("Range")
                String commentText = cursor.getString(cursor.getColumnIndex(COL_COMMENT_TEXT));
                comments.add(new Comment(userName, commentText));
            } while (cursor.moveToNext());
            cursor.close();
        }
        return comments;
    }

    // Define the User class within DatabaseHelper
    public static class User {
        private String username;
        private String displayName;
        private String profilePhoto;

        public User(String username, String displayName, String profilePhoto) {
            this.username = username;
            this.displayName = displayName;
            this.profilePhoto = profilePhoto;
        }

        public String getUsername() {
            return username;
        }

        public String getDisplayName() {
            return displayName;
        }

        public String getProfilePhoto() {
            return profilePhoto;
        }
    }
}
