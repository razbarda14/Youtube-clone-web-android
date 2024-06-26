package com.example.youtube;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.fragment.app.Fragment;

import com.example.youtube.LoginActivity;
import com.example.youtube.MainPageActivity;
import com.example.youtube.UploadVideoActivity;
import com.example.youtube.UserSession;

public class DownBarFragment extends Fragment {

    private ImageButton homeButton;
    private ImageButton addButton;
    private ImageButton modeButton;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_down_bar, container, false);

        homeButton = view.findViewById(R.id.home_button);
        addButton = view.findViewById(R.id.add_button);
        modeButton = view.findViewById(R.id.mode_button);

        homeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), MainPageActivity.class);
                startActivity(intent);
            }
        });

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isUserLoggedIn()) {
                    Intent intent = new Intent(getActivity(), UploadVideoActivity.class);
                    startActivity(intent);
                } else {
                    showSignInAlert();
                }
            }
        });

        modeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toggleTheme();
            }
        });

        return view;
    }

    private boolean isUserLoggedIn() {
        return UserSession.getInstance().isLoggedIn();
    }

    private void showSignInAlert() {
        new AlertDialog.Builder(getActivity())
                .setTitle("Sign In Required")
                .setMessage("Only signed in users can upload videos.")
                .setPositiveButton("Sign In", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent(getActivity(), LoginActivity.class);
                        startActivity(intent);
                    }
                })
                .setNegativeButton("Cancel", null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }

    private void toggleTheme() {
        SharedPreferences sharedPreferences = getActivity().getSharedPreferences("ThemePrefs", Context.MODE_PRIVATE);
        boolean isNight = sharedPreferences.getBoolean("isNightMode", false);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        if (isNight) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
            editor.putBoolean("isNightMode", false);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
            editor.putBoolean("isNightMode", true);
        }
        editor.apply();
        getActivity().recreate();
    }
}
