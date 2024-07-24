package com.example.youtube.activities;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube.R;
import com.example.youtube.adapters.VideoSessionAdapter;
import com.example.youtube.entities.UserSession;
import com.example.youtube.model.User;
import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.TokenManager;
import com.example.youtube.view_model.UserViewModel;
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
    private Button editDetailsButton;
    private UserViewModel userViewModel;
    private TokenManager tokenManager;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_page);

        recyclerView = findViewById(R.id.recycler_view);
        displayNameTextView = findViewById(R.id.display_name);
        profileImageView = findViewById(R.id.profile_image);
        editDetailsButton = findViewById(R.id.edit_details_button);
        videoAdapter = new VideoSessionAdapter(this, userVideoList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(videoAdapter);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        tokenManager = new TokenManager(this);

        UserSession userSession = UserSession.getInstance();
        String userId = userSession.getUserId();
        displayNameTextView.setText(userSession.getDisplayName());
        String profilePhotoUrl = userSession.getProfilePhoto();
        if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
            setImageFromUrl(profileImageView, profilePhotoUrl);
        } else {
            profileImageView.setImageResource(R.drawable.default_profile);
        }

        // Verify user token
        String token = tokenManager.getToken();
        if (token != null) {
            userViewModel.verifyUser(token).observe(this, new Observer<User>() {
                @Override
                public void onChanged(User user) {
                    if (user != null && user.getId().equals(userId)) {
                        editDetailsButton.setVisibility(View.VISIBLE);
                    } else {
                        editDetailsButton.setVisibility(View.GONE);
                    }
                }
            });
        }

        videoViewModel = new ViewModelProvider(this).get(VideoViewModel.class);
        videoViewModel.getUserVideos(userId).observe(this, new Observer<List<VideoSession>>() {
            @Override
            public void onChanged(List<VideoSession> videos) {
                if (videos != null) {
                    userVideoList.clear();
                    userVideoList.addAll(videos);
                    videoAdapter.updateList(userVideoList);
                    fetchDisplayNamesAndUpdateVideos(videos);
                } else {
                    Log.e(TAG, "Failed to fetch user videos");
                }
            }
        });

        editDetailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showEditDetailsDialog(userSession);
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

    private void showEditDetailsDialog(UserSession userSession) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Edit Details");

        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);

        final EditText displayNameInput = new EditText(this);
        displayNameInput.setHint("Display Name");
        displayNameInput.setText(userSession.getDisplayName());
        layout.addView(displayNameInput);

        builder.setView(layout);

        builder.setPositiveButton("Save", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String newDisplayName = displayNameInput.getText().toString();
                if (!newDisplayName.isEmpty()) {
                    userSession.setDisplayName(newDisplayName);
                    displayNameTextView.setText(newDisplayName);
                    String token = tokenManager.getToken();
                    // Update the display name in the backend if necessary
                    userViewModel.updateDisplayName(token, userSession.getUserId(), newDisplayName).observe(UserPageActivity.this, new Observer<Boolean>() {
                        @Override
                        public void onChanged(Boolean success) {
                            if (success) {
                                userSession.setDisplayName(newDisplayName);
                                displayNameTextView.setText(newDisplayName);
                                Toast.makeText(UserPageActivity.this, "Display name updated", Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(UserPageActivity.this, "Failed to update display name", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
                } else {
                    Toast.makeText(UserPageActivity.this, "Display name cannot be empty", Toast.LENGTH_SHORT).show();
                }
            }
        });

        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        builder.show();
    }

    private void fetchDisplayNamesAndUpdateVideos(List<VideoSession> videos) {
        for (VideoSession video : videos) {
            userViewModel.getUserDisplayName(video.getUploaderId()).observe(this, displayName -> {
                if (displayName != null) {
                    video.setUploaderDisplayName(displayName); // Update the uploaderId with the display name
                }
                videoAdapter.notifyDataSetChanged(); // Notify the adapter about data changes
            });
        }
    }
}
