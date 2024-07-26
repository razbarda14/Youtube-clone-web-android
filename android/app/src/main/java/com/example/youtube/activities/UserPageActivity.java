package com.example.youtube.activities;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
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

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
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
    private Button deleteUserButton;
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
        deleteUserButton = findViewById(R.id.delete_user_button);
        videoAdapter = new VideoSessionAdapter(this, userVideoList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(videoAdapter);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        videoViewModel = new ViewModelProvider(this).get(VideoViewModel.class); // Initialize videoViewModel
        tokenManager = new TokenManager(this);

        Intent intent = getIntent();
        String passedUserId = intent.getStringExtra("userId");
        String token = tokenManager.getToken();

        if (token != null) {
            userViewModel.verifyUser(token).observe(this, new Observer<User>() {
                @Override
                public void onChanged(User user) {
                    if (user != null) {
                        UserSession userSession = UserSession.getInstance();
                        if (passedUserId.equals(userSession.getUserId())) {
                            // Token is verified and user ID matches, show user details from UserSession
                            showUserDetailsFromSession();
                            fetchUserVideos(userSession.getUserId());
                            editDetailsButton.setVisibility(View.VISIBLE);
                            deleteUserButton.setVisibility(View.VISIBLE);
                        } else {
                            // Token is verified but user ID does not match, fetch user details from server
                            fetchUserDetailsFromServer(passedUserId);
                            fetchUserVideos(passedUserId);
                        }
                    } else {
                        // Token is not verified, fetch user details from server
                        fetchUserDetailsFromServer(passedUserId);
                        fetchUserVideos(passedUserId);
                    }
                }
            });
        } else {
            // No token, fetch user details from server
            fetchUserDetailsFromServer(passedUserId);
            fetchUserVideos(passedUserId);
        }

        editDetailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showEditDetailsDialog(UserSession.getInstance());
            }
        });

        deleteUserButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showDeleteUserDialog(UserSession.getInstance());
            }
        });
    }

    private void fetchUserDetailsFromServer(String userId) {
        userViewModel.getUserById(userId).observe(this, new Observer<User>() {
            @Override
            public void onChanged(User user) {
                if (user != null) {
                    displayNameTextView.setText(user.getDisplay_name());
                    String profilePhotoUrl = user.getImage();

                    if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
                        profilePhotoUrl = profilePhotoUrl.replace("\\", "/");
                        if (!profilePhotoUrl.startsWith("http://") && !profilePhotoUrl.startsWith("https://")) {
                            profilePhotoUrl = "http://10.0.2.2:8080" + profilePhotoUrl; // Replace with your server URL
                        }

                        // Use Glide to load the profile image
                        Glide.with(UserPageActivity.this)
                                .load(profilePhotoUrl)
                                .apply(new RequestOptions()
                                        .placeholder(R.drawable.default_profile)
                                        .error(R.drawable.default_profile))
                                .into(profileImageView);
                    } else {
                        profileImageView.setImageResource(R.drawable.default_profile);
                    }
                } else {
                    Log.e(TAG, "Failed to fetch user details from server");
                }
            }
        });
    }

    private void showUserDetailsFromSession() {
        UserSession userSession = UserSession.getInstance();
        displayNameTextView.setText(userSession.getDisplayName());
        String profilePhotoUrl = userSession.getProfilePhoto();

        if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
            profilePhotoUrl = profilePhotoUrl.replace("\\", "/");
            if (!profilePhotoUrl.startsWith("http://") && !profilePhotoUrl.startsWith("https://")) {
                profilePhotoUrl = "http://10.0.2.2:8080" + profilePhotoUrl; // Replace with your server URL
            }

            // Use Glide to load the profile image
            Glide.with(this)
                    .load(profilePhotoUrl)
                    .apply(new RequestOptions()
                            .placeholder(R.drawable.default_profile)
                            .error(R.drawable.default_profile))
                    .into(profileImageView);
        } else {
            profileImageView.setImageResource(R.drawable.default_profile);
        }
    }

    private void fetchUserVideos(String userId) {
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

    private void showDeleteUserDialog(UserSession userSession) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Delete User");
        builder.setMessage("Are you sure you want to delete your account? This action cannot be undone.");

        builder.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String token = tokenManager.getToken();
                userViewModel.deleteUser(token, userSession.getUserId()).observe(UserPageActivity.this, new Observer<Boolean>() {
                    @Override
                    public void onChanged(Boolean success) {
                        if (success) {
                            Toast.makeText(UserPageActivity.this, "Account deleted successfully", Toast.LENGTH_SHORT).show();
                            // Clear user session and token
                            userSession.clearSession();
                            tokenManager.clearToken();
                            // Redirect to the login or main page
                            Intent intent = new Intent(UserPageActivity.this, MainPageActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            startActivity(intent);
                            finish();
                        } else {
                            Toast.makeText(UserPageActivity.this, "Failed to delete account", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
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

}