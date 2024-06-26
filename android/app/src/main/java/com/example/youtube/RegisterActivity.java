package com.example.youtube;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
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
import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube.LoginActivity;
import com.example.youtube.MainPageActivity;
import com.example.youtube.UserSession;

import java.io.IOException;

import data.DatabaseHelper;

public class RegisterActivity extends AppCompatActivity {

    private static final int PICK_IMAGE_REQUEST = 1;

    DatabaseHelper db;
    EditText username, password, repassword, displayName;
    Button register, uploadPhoto;
    ImageView profileImageView;
    Uri imageUri;

    private final ActivityResultLauncher<Intent> activityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                    imageUri = result.getData().getData();
                    try {
                        Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), imageUri);
                        profileImageView.setImageBitmap(bitmap);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        db = new DatabaseHelper(this);
        username = findViewById(R.id.register_username);
        password = findViewById(R.id.register_password);
        repassword = findViewById(R.id.register_repassword);
        displayName = findViewById(R.id.register_display_name);
        register = findViewById(R.id.register_button);
        uploadPhoto = findViewById(R.id.register_upload_photo);
        profileImageView = findViewById(R.id.register_profile_image);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String user = username.getText().toString().trim();
                String pass = password.getText().toString().trim();
                String repass = repassword.getText().toString().trim();
                String display = displayName.getText().toString().trim();

                if (user.equals("") || pass.equals("") || repass.equals("") || display.equals("")) {
                    Toast.makeText(RegisterActivity.this, "Please fill all fields", Toast.LENGTH_SHORT).show();
                } else {
                    if (isValidPassword(pass)) {
                        if (pass.equals(repass)) {
                            if (db.checkUsernameExists(user)) {
                                Toast.makeText(RegisterActivity.this, "Username already exists", Toast.LENGTH_SHORT).show();
                            } else if (db.checkDisplayNameExists(display)) {
                                Toast.makeText(RegisterActivity.this, "Display name already exists", Toast.LENGTH_SHORT).show();
                            } else {
                                String profilePhoto = imageUri != null ? imageUri.toString() : "";
                                boolean insert = db.insertUser(user, pass, display, profilePhoto);
                                if (insert) {
                                    UserSession userSession = UserSession.getInstance();
                                    userSession.setUsername(user);
                                    userSession.setDisplayName(display);
                                    userSession.setProfilePhoto(profilePhoto);

                                    Toast.makeText(RegisterActivity.this, "Registered successfully", Toast.LENGTH_SHORT).show();
                                    Intent intent = new Intent(getApplicationContext(), MainPageActivity.class);
                                    startActivity(intent);
                                } else {
                                    Toast.makeText(RegisterActivity.this, "Registration failed", Toast.LENGTH_SHORT).show();
                                }
                            }
                        } else {
                            Toast.makeText(RegisterActivity.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Toast.makeText(RegisterActivity.this, "Password must be at least 8 characters long and contain both letters and numbers", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        uploadPhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openImageChooser();
            }
        });

        findViewById(R.id.login1_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
    }

    private boolean isValidPassword(String password) {
        return password.length() >= 8 && password.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    }

    private void openImageChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        activityResultLauncher.launch(Intent.createChooser(intent, "Select Picture"));
    }
}
