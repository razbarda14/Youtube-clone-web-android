package com.example.youtube;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class VideoDetailActivity extends AppCompatActivity {

    private TextView videoDetailTitle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_detail);

        videoDetailTitle = findViewById(R.id.video_detail_title);

        // Get the video ID from the intent
        Intent intent = getIntent();
        String videoId = intent.getStringExtra("VIDEO_ID");
        String videoTitle = intent.getStringExtra("VIDEO_TITLE");

        // Display the video title (or other details)
        videoDetailTitle.setText(videoTitle);

        // Fetch and display additional video details based on the videoId
    }
}
