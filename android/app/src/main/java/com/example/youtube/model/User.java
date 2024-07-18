package com.example.youtube.model;

import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("_id")
    private String _id;
    private String username;
    private String display_name;
    private String image;

    // Default constructor
    public User() {}

    // Parameterized constructor
    public User(String id, String username, String display_name, String image) {
        this._id = id;
        this.username = username;
        this.display_name = display_name;
        this.image = image;
    }

    // Getter and Setter for id
    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    // Getter and Setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter for display_name
    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }

    // Getter and Setter for image
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + _id + '\'' +
                ", username='" + username + '\'' +
                ", display_name='" + display_name + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
