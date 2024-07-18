//// UploadVideoActivity.java
//package com.example.youtube.activities;
//
//import android.content.Intent;
//import android.net.Uri;
//import android.os.Bundle;
//import android.os.Environment;
//import android.util.Log;
//import android.view.View;
//import android.widget.Button;
//import android.widget.EditText;
//import android.widget.ImageView;
//import android.widget.Toast;
//
//import androidx.annotation.Nullable;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.lifecycle.Observer;
//import androidx.lifecycle.ViewModelProvider;
//
//import com.example.youtube.R;
//import com.example.youtube.model.User;
//import com.example.youtube.model.VideoSession;
//import com.example.youtube.viesmodels.UserViewModel;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.Locale;
//import java.util.UUID;
//
//import okhttp3.MediaType;
//import okhttp3.MultipartBody;
//import okhttp3.RequestBody;
//
//public class UploadVideoActivity extends AppCompatActivity {
//
//    private EditText editTextTitle;
//    private EditText editTextDescription;
//    private EditText editTextTopic;
//    private ImageView imageView;
//    private UserViewModel userViewModel;
//    private User currentUser;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_upload_video);
//
//        editTextTitle = findViewById(R.id.edit_text_title);
//        editTextDescription = findViewById(R.id.edit_text_description);
//        editTextTopic = findViewById(R.id.edit_text_topic);
//        Button buttonUpload = findViewById(R.id.button_upload);
//        Button buttonBackToHome = findViewById(R.id.button_back_to_home);
//        imageView = findViewById(R.id.image_view);
//
//        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
//
//        buttonUpload.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                if (validateFields()) {
//                    uploadVideo();
//                } else {
//                    showToast("Please fill all fields before uploading.");
//                }
//            }
//        });
//
//        buttonBackToHome.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(UploadVideoActivity.this, MainPageActivity.class);
//                startActivity(intent);
//            }
//        });
//    }
//
//    private boolean validateFields() {
//        return !editTextTitle.getText().toString().isEmpty() &&
//                !editTextDescription.getText().toString().isEmpty() &&
//                !editTextTopic.getText().toString().isEmpty();
//    }
//
//    private void uploadVideo() {
//        String title = editTextTitle.getText().toString();
//        String description = editTextDescription.getText().toString();
//        String topic = editTextTopic.getText().toString();
//
//        // Get the current user's ID
//        String uploaderId = currentUser != null ? currentUser.getId() : "6696aaa84b7684eb2e98cee8";
//
//        // Create a dummy video file
//        File videoFile = createDummyVideoFile();
//        if (videoFile == null) {
//            showToast("Failed to create dummy video file");
//            return;
//        }
//
//        // Create a dummy image file (for thumbnail)
//        File imageFile = createDummyImageFile();
//        if (imageFile == null) {
//            showToast("Failed to create dummy image file");
//            return;
//        }
//
//        RequestBody videoRequestBody = RequestBody.create(MediaType.parse("video/*"), videoFile);
//        MultipartBody.Part videoPart = MultipartBody.Part.createFormData("videoFile", videoFile.getName(), videoRequestBody);
//
//        RequestBody imageRequestBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
//        MultipartBody.Part imagePart = MultipartBody.Part.createFormData("thumbnailFile", imageFile.getName(), imageRequestBody);
//
//        RequestBody titleRequestBody = RequestBody.create(MediaType.parse("text/plain"), title);
//        RequestBody descriptionRequestBody = RequestBody.create(MediaType.parse("text/plain"), description);
//        RequestBody topicRequestBody = RequestBody.create(MediaType.parse("text/plain"), topic);
//
//        userViewModel.createVideo(uploaderId, videoPart, imagePart, titleRequestBody, descriptionRequestBody, topicRequestBody).observe(this, new Observer<VideoSession>() {
//            @Override
//            public void onChanged(VideoSession video) {
//                if (video != null) {
//                    showToast("Video uploaded successfully.");
//                    // Handle successful video upload
//                    Intent intent = new Intent(UploadVideoActivity.this, MainPageActivity.class);
//                    intent.putExtra("VIDEO_ID", video.getId());
//                    intent.putExtra("VIDEO_TITLE", video.getTitle());
//                    intent.putExtra("VIDEO_URL", video.getVideoPath());
//                    intent.putExtra("IMAGE_URL", video.getThumbnailPath());
//                    intent.putExtra("VIDEO_LIKES", video.getLikes());
//                    intent.putExtra("VIDEO_VIEWS", video.getViewsCount());
//                    intent.putExtra("VIDEO_UPLOAD_DATE", video.getDateUploaded());
//                    intent.putExtra("VIDEO_DESCRIPTION", video.getDescription());
//                    intent.putExtra("VIDEO_TOPIC", video.getTopic());
//                    intent.putExtra("VIDEO_CHANNEL", video.getUploaderId());
//                    startActivity(intent);
//                } else {
//                    showToast("Failed to upload video.");
//                }
//            }
//        });
//    }
//
//    private File createDummyVideoFile() {
//        File file = new File(getExternalFilesDir(Environment.DIRECTORY_MOVIES), "dummy_video.mp4");
//        try (FileOutputStream fos = new FileOutputStream(file)) {
//            byte[] dummyData = new byte[1024]; // 1 KB of dummy data
//            fos.write(dummyData);
//            return file;
//        } catch (IOException e) {
//            Log.e("UploadVideoActivity", "Failed to create dummy video file", e);
//            return null;
//        }
//    }
//
//    private File createDummyImageFile() {
//        File file = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES), "dummy_image.jpg");
//        try (FileOutputStream fos = new FileOutputStream(file)) {
//            byte[] dummyData = new byte[1024]; // 1 KB of dummy data
//            fos.write(dummyData);
//            return file;
//        } catch (IOException e) {
//            Log.e("UploadVideoActivity", "Failed to create dummy image file", e);
//            return null;
//        }
//    }
//
//    private void showToast(String message) {
//        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
//    }
//}



package com.example.youtube.activities;

import android.annotation.SuppressLint;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.OpenableColumns;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.youtube.R;
import com.example.youtube.entities.UserSession;
import com.example.youtube.model.VideoSession;
import com.example.youtube.viesmodels.UserViewModel;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;

public class UploadVideoActivity extends AppCompatActivity {

    private static final int PICK_VIDEO_REQUEST = 1;
    private static final int PICK_IMAGE_REQUEST = 2;
    private Uri videoUri;
    private Uri imageUri;
    private ImageView imageView;
    private EditText editTextTitle;
    private EditText editTextDescription;
    private EditText editTextTopic;
    private UserViewModel userViewModel;
    private UserSession userSession;

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

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        userSession = UserSession.getInstance();

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
                    showToast("Please fill all fields before uploading.");
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

        // Get the current user's ID
        String uploaderId = "1"; // Assuming username is used as ID here

        File videoFile = getFileFromUri(videoUri);
        File imageFile = getFileFromUri(imageUri);

        if (videoFile == null || imageFile == null) {
            showToast("Failed to get files");
            return;
        }

        RequestBody videoRequestBody = RequestBody.create(MediaType.parse("video/*"), videoFile);
        MultipartBody.Part videoPart = MultipartBody.Part.createFormData("videoFile", videoFile.getName(), videoRequestBody);

        RequestBody imageRequestBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
        MultipartBody.Part imagePart = MultipartBody.Part.createFormData("thumbnailFile", imageFile.getName(), imageRequestBody);

        RequestBody titleRequestBody = RequestBody.create(MediaType.parse("text/plain"), title);
        RequestBody descriptionRequestBody = RequestBody.create(MediaType.parse("text/plain"), description);
        RequestBody topicRequestBody = RequestBody.create(MediaType.parse("text/plain"), topic);

        userViewModel.createVideo(uploaderId, videoPart, imagePart, titleRequestBody, descriptionRequestBody, topicRequestBody).observe(this, new Observer<VideoSession>() {
            @Override
            public void onChanged(VideoSession video) {
                if (video != null) {
                    showToast("Video uploaded successfully.");
                    // Handle successful video upload
                    Intent intent = new Intent(UploadVideoActivity.this, MainPageActivity.class);
                    intent.putExtra("VIDEO_ID", video.getId());
                    intent.putExtra("VIDEO_TITLE", video.getTitle());
                    intent.putExtra("VIDEO_URL", video.getVideoPath());
                    intent.putExtra("IMAGE_URL", video.getThumbnailPath());
                    intent.putExtra("VIDEO_LIKES", video.getLikes());
                    intent.putExtra("VIDEO_VIEWS", video.getViewsCount());
                    intent.putExtra("VIDEO_UPLOAD_DATE", video.getDateUploaded());
                    intent.putExtra("VIDEO_DESCRIPTION", video.getDescription());
                    intent.putExtra("VIDEO_TOPIC", video.getTopic());
                    intent.putExtra("VIDEO_CHANNEL", video.getUploaderId());
                    startActivity(intent);
                } else {
                    showToast("Failed to upload video.");
                }
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

    private File getFileFromUri(Uri uri) {
        ContentResolver contentResolver = getContentResolver();
        File file = null;
        try (Cursor cursor = contentResolver.query(uri, null, null, null, null)) {
            if (cursor != null && cursor.moveToFirst()) {
                @SuppressLint("Range") String displayName = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                InputStream inputStream = contentResolver.openInputStream(uri);
                if (inputStream != null) {
                    file = new File(getExternalFilesDir(Environment.DIRECTORY_MOVIES), displayName);
                    try (FileOutputStream outputStream = new FileOutputStream(file)) {
                        byte[] buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = inputStream.read(buffer)) != -1) {
                            outputStream.write(buffer, 0, bytesRead);
                        }
                    }
                }
            }
        } catch (IOException e) {
            Log.e("UploadVideoActivity", "Failed to get file from Uri", e);
        }
        return file;
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}
