package com.example.youtube.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube.entities.UserSession;

public abstract class BaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Check if the user is logged in
        UserSession userSession = UserSession.getInstance();
        if (!userSession.isLoggedIn()) {
            // If not logged in, redirect to LoginActivity
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
            finish();
        } else {
            // If logged in, display the display name and profile picture
            Toast.makeText(this, "Welcome " + userSession.getDisplayName(), Toast.LENGTH_SHORT).show();
            // You can set the profile picture here if you have an ImageView in your layout
        }
    }
}
