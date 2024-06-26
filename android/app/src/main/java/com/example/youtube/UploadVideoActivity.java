package com.example.youtube;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

public class UploadVideoActivity extends AppCompatActivity {

    private static final int PICK_VIDEO_REQUEST = 1;
    private static final int PICK_IMAGE_REQUEST = 2;
    private Uri videoUri;
    private Uri imageUri;
    private ImageView imageView;
    private EditText editTextTitle;
    private EditText editTextDescription;
    private EditText editTextTopic;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_video);

        editTextTitle = findViewById(R.id.edit_text_title);
        editTextDescription = findViewById(R.id.edit_text_description);
        editTextTopic = findViewById(R.id.edit_text_topic);
        Button buttonChooseVideo = findViewById(R.id.button_choose_video);
        Button buttonChooseImage = findViewById(R.id.button_choose_image);
        Button buttonUpload = findViewById(R.id.button_upload);
        Button buttonBackToHome = findViewById(R.id.button_back_to_home);
        imageView = findViewById(R.id.image_view);

        buttonChooseVideo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chooseVideo();
            }
        });

        buttonChooseImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chooseImage();
            }
        });

        buttonUpload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (validateFields()) {
                    uploadVideo();
                } else {
                    showToast("Please fill all fields and choose both a video and an image before uploading.");
                }
            }
        });

        buttonBackToHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UploadVideoActivity.this, MainPageActivity.class);
                startActivity(intent);
            }
        });
    }

    private void chooseVideo() {
        Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_VIDEO_REQUEST);
    }

    private void chooseImage() {
        Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_VIDEO_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            videoUri = data.getData();
        } else if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            imageUri = data.getData();
            imageView.setImageURI(imageUri);
        }
    }

    private boolean validateFields() {
        return !editTextTitle.getText().toString().isEmpty() &&
                !editTextDescription.getText().toString().isEmpty() &&
                !editTextTopic.getText().toString().isEmpty() &&
                videoUri != null &&
                imageUri != null;
    }

    private void uploadVideo() {
        String title = editTextTitle.getText().toString();
        String description = editTextDescription.getText().toString();
        String topic = editTextTopic.getText().toString();
        String id = UUID.randomUUID().toString();

        // Get the current date
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault());
        String currentDate = sdf.format(new Date());

        // Get the current user's display name
        String channel = UserSession.getInstance().getDisplayName();

        // Create a new Video object with the current date
        Video video = new Video(id, title, videoUri.toString(), imageUri.toString(), 0, 0, currentDate, description, topic, false, channel, new ArrayList<>());

        // Add the uploaded video to the VideoStateManager
        VideoStateManager.getInstance().addVideo(video);

        Intent intent = new Intent(UploadVideoActivity.this, MainPageActivity.class);
        intent.putExtra("VIDEO_ID", video.getId());
        intent.putExtra("VIDEO_TITLE", video.getTitle());
        intent.putExtra("VIDEO_URL", video.getVideoUrl());
        intent.putExtra("IMAGE_URL", video.getImageUrl());
        intent.putExtra("VIDEO_LIKES", video.getNumLikes());
        intent.putExtra("VIDEO_VIEWS", video.getNumViews());
        intent.putExtra("VIDEO_UPLOAD_DATE", video.getUploadDate());
        intent.putExtra("VIDEO_DESCRIPTION", video.getDescription());
        intent.putExtra("VIDEO_TOPIC", video.getTopic());
        intent.putExtra("VIDEO_CHANNEL", video.getChannel());
        startActivity(intent);
    }




    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}
