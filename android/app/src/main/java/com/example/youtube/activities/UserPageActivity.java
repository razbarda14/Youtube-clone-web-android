package com.example.youtube.activities;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube.R;
import com.example.youtube.adapters.VideoSessionAdapter;
import com.example.youtube.entities.UserSession;
import com.example.youtube.model.VideoSession;
import com.example.youtube.view_model.VideoViewModel;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class UserPageActivity extends AppCompatActivity {

    private static final String TAG = "UserVideosActivity";
    private List<VideoSession> userVideoList = new ArrayList<>();
    private RecyclerView recyclerView;
    private VideoSessionAdapter videoAdapter;
    private VideoViewModel videoViewModel;
    private TextView displayNameTextView;
    private ImageView profileImageView;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_page);

        recyclerView = findViewById(R.id.recycler_view);
        displayNameTextView = findViewById(R.id.display_name);
        profileImageView = findViewById(R.id.profile_image);
        videoAdapter = new VideoSessionAdapter(this, userVideoList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(videoAdapter);

        UserSession userSession = UserSession.getInstance();
        String userId = userSession.getUserId();
        displayNameTextView.setText(userSession.getDisplayName());
        String profilePhotoUrl = userSession.getProfilePhoto();
        if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
            setImageFromUrl(profileImageView, profilePhotoUrl);
        } else {
            profileImageView.setImageResource(R.drawable.default_profile);
        }

        videoViewModel = new ViewModelProvider(this).get(VideoViewModel.class);
        videoViewModel.getUserVideos(userId).observe(this, new Observer<List<VideoSession>>() {
            @Override
            public void onChanged(List<VideoSession> videos) {
                if (videos != null) {
                    userVideoList.clear();
                    userVideoList.addAll(videos);
                    videoAdapter.updateList(userVideoList);
                } else {
                    Log.e(TAG, "Failed to fetch user videos");
                }
            }
        });
    }

    private void setImageFromUrl(ImageView imageView, String urlString) {
        if (urlString != null && !urlString.isEmpty()) {
            new Thread(() -> {
                try {
                    Log.d(TAG, "Loading image from URL: " + urlString);
                    InputStream inputStream = new URL(urlString).openStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                    runOnUiThread(() -> {
                        if (bitmap != null) {
                            imageView.setImageBitmap(bitmap);
                        } else {
                            Log.e(TAG, "Bitmap is null");
                            imageView.setImageResource(R.drawable.default_profile);
                        }
                    });
                } catch (IOException e) {
                    Log.e(TAG, "Error loading image from URL", e);
                    runOnUiThread(() -> imageView.setImageResource(R.drawable.default_profile));
                }
            }).start();
        } else {
            Log.e(TAG, "Image URL is null or empty");
            imageView.setImageResource(R.drawable.default_profile);
        }
    }
}
