package com.example.youtube.activities;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube.entities.Comment;
import com.example.youtube.adapters.CommentAdapter;
import com.example.youtube.R;
import com.example.youtube.entities.UserSession;
import com.example.youtube.entities.Video;
import com.example.youtube.adapters.VideoAdapter;
import com.example.youtube.model.VideoSession;
import com.example.youtube.view_model.CommentViewModel;
import com.example.youtube.view_model.UserViewModel;
import com.example.youtube.view_model.VideoViewModel;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;

public class VideoPageActivity extends AppCompatActivity {
    private EditText editVideoTitle;
    private EditText editVideoDescription;
    private Button saveChangesButton;
    private VideoView videoView;
    private TextView videoTitle;
    private TextView viewsTextView;
    private TextView uploadDateTextView;
    private TextView descriptionTextView;
    private TextView topicTextView;
    private TextView channelTextView;
    private RecyclerView commentsRecyclerView;
    private RecyclerView relatedVideosRecyclerView;
    private CommentAdapter commentAdapter;
    private VideoAdapter relatedVideosAdapter;
    private List<Comment> commentList;
    private List<Video> relatedVideoList;

    private Button likeButton;
    private Button dislikeButton;
    private Button shareButton;
    private Button downloadButton;
    private Button editVideoButton;

    private boolean isLiked = false;
    private boolean isDisliked = false;
    private int likes;
    private TextView likesTextView;
    private EditText commentInput;
    private Button addCommentButton;
    private Button cancelCommentButton;
    private Button deleteVideoButton;

    private String videoId;
    private UserViewModel userViewModel;
    private VideoViewModel videoViewModel;
    private CommentViewModel commentViewModel;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_page);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);
        commentViewModel = new ViewModelProvider(this).get(CommentViewModel.class);
        videoViewModel = new ViewModelProvider(this).get(VideoViewModel.class);

        videoView = findViewById(R.id.video_view);
        videoTitle = findViewById(R.id.video_title);
        likeButton = findViewById(R.id.like_button);
        dislikeButton = findViewById(R.id.dislike_button);
        shareButton = findViewById(R.id.share_button);
        downloadButton = findViewById(R.id.download_button);
        editVideoButton = findViewById(R.id.edit_video_button);
        viewsTextView = findViewById(R.id.views_text_view);
        uploadDateTextView = findViewById(R.id.upload_date_text_view);
        descriptionTextView = findViewById(R.id.description_text_view);
        topicTextView = findViewById(R.id.topic_text_view);
        channelTextView = findViewById(R.id.channel_text_view);
        commentInput = findViewById(R.id.comment_input);
        addCommentButton = findViewById(R.id.add_comment_button);
        cancelCommentButton = findViewById(R.id.cancel_comment_button);
        editVideoTitle = findViewById(R.id.edit_video_title);
        editVideoDescription = findViewById(R.id.edit_video_description);
        saveChangesButton = findViewById(R.id.save_changes_button);
        likesTextView = findViewById(R.id.likes_text_view);
        deleteVideoButton = findViewById(R.id.delete_video_button);

        // Get video details from intent
        Intent intent = getIntent();
        videoId = intent.getStringExtra("VIDEO_ID");
        String videoUrl = intent.getStringExtra("VIDEO_URL");
        String title = intent.getStringExtra("VIDEO_TITLE");
        likes = intent.getIntExtra("VIDEO_LIKES", 0);
        int views = intent.getIntExtra("VIDEO_VIEWS", 0);
        String uploadDate = intent.getStringExtra("VIDEO_UPLOAD_DATE");
        String description = intent.getStringExtra("VIDEO_DESCRIPTION");
        String topic = intent.getStringExtra("VIDEO_TOPIC");
        String channel = intent.getStringExtra("VIDEO_CHANNEL");

        // Fetch and display the uploader's display name
        userViewModel.getUserDisplayName(channel).observe(this, displayName -> {
            if (displayName != null) {
                channelTextView.setText(displayName);
            } else {
                channelTextView.setText(channel); // Fallback to uploaderId if display name is not found
            }
        });

        // Deserialize the comments JSON string back to a list of Comment objects
        String commentsJson = intent.getStringExtra("VIDEO_COMMENTS");
        Log.d("VideoPageActivity", "Raw Comments JSON: " + commentsJson);
        Gson gson = new Gson();
        List<Comment> comments = gson.fromJson(commentsJson, new TypeToken<List<Comment>>() {}.getType());

        // Set up the video player
        setUpVideoPlayer(videoUrl);
        // Set video title
        videoTitle.setText(title);

        // Retrieve and update video state
        VideoStateManager videoStateManager = VideoStateManager.getInstance();
        videoStateManager.initializeViewCount(videoId, views); // 'views' is the number of views from the JSON
        videoStateManager.initializeLikeCount(videoId, likes); // Initialize default like count
        likes = videoStateManager.getLikeCount(videoId);
        videoStateManager.incrementViewCount(videoId);
        views = videoStateManager.getViewCount(videoId); // Get the updated view count
        viewsTextView.setText("Views: " + views); // Update the viewsTextView with the incremented view count
        likesTextView.setText("Likes: " + likes);
        String currentUserId = UserSession.getInstance().getUsername();
        isLiked = videoStateManager.isLikedByUser(videoId, currentUserId);
        isDisliked = videoStateManager.isDislikedByUser(videoId, currentUserId);
        updateButtonColors();
        setUpLikeButton(currentUserId);
        setUpDislikeButton(currentUserId);

        viewsTextView.setText("Views: " + views);
        uploadDateTextView.setText("Uploaded on: " + uploadDate);
        descriptionTextView.setText(description);
        topicTextView.setText("Topic: " + topic);
        channelTextView.setText("Channel: " + channel);

        // Show edit video button if user is logged in
        if (isUserLoggedIn()) {
            editVideoButton.setVisibility(View.VISIBLE);
        } else {
            editVideoButton.setVisibility(View.GONE);
        }

        if (isUserLoggedIn()) {
            commentInput.setVisibility(View.VISIBLE);
        } else {
            commentInput.setVisibility(View.GONE);
        }
        if (isUserLoggedIn()) {
            cancelCommentButton.setVisibility(View.VISIBLE);
        } else {
            cancelCommentButton.setVisibility(View.GONE);
        }
        if (isUserLoggedIn()) {
            addCommentButton.setVisibility(View.VISIBLE);
            deleteVideoButton.setVisibility(View.VISIBLE);
        } else {
            addCommentButton.setVisibility(View.GONE);
            deleteVideoButton.setVisibility(View.GONE);
        }

        editVideoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isUserLoggedIn()) {
                    String tempTitle = VideoStateManager.getInstance().getTitle(videoId);
                    String tempDescription = VideoStateManager.getInstance().getDescription(videoId);

                    if (tempTitle != null) {
                        editVideoTitle.setText(tempTitle);
                    } else {
                        editVideoTitle.setText(videoTitle.getText());
                    }

                    if (tempDescription != null) {
                        editVideoDescription.setText(tempDescription);
                    } else {
                        editVideoDescription.setText(descriptionTextView.getText());
                    }

                    editVideoTitle.setVisibility(View.VISIBLE);
                    editVideoDescription.setVisibility(View.VISIBLE);
                    saveChangesButton.setVisibility(View.VISIBLE);

                    likeButton.setVisibility(View.GONE);
                    dislikeButton.setVisibility(View.GONE);
                    shareButton.setVisibility(View.GONE);
                    downloadButton.setVisibility(View.GONE);

                    findViewById(R.id.scrollable_content).setPadding(0, 0, 0, saveChangesButton.getHeight() + 16);
                } else {
                    showSignInAlert();
                }
            }
        });

        saveChangesButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String newTitle = editVideoTitle.getText().toString();
                String newDescription = editVideoDescription.getText().toString();

                VideoSession updatedVideo = new VideoSession();
                updatedVideo.setId(videoId);
                updatedVideo.setTitle(newTitle);
                updatedVideo.setDescription(newDescription);

                // Call ViewModel to update video
                videoViewModel.updateVideoDetails(updatedVideo);

                Toast.makeText(VideoPageActivity.this, "Video was updated successfully", Toast.LENGTH_SHORT).show();

                videoTitle.setText(newTitle);
                descriptionTextView.setText(newDescription);

                editVideoTitle.setVisibility(View.GONE);
                editVideoDescription.setVisibility(View.GONE);
                saveChangesButton.setVisibility(View.GONE);

                likeButton.setVisibility(View.VISIBLE);
                dislikeButton.setVisibility(View.VISIBLE);
                shareButton.setVisibility(View.VISIBLE);
                downloadButton.setVisibility(View.VISIBLE);

                findViewById(R.id.scrollable_content).setPadding(0, 0, 0, 0);
            }
        });

        deleteVideoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new AlertDialog.Builder(VideoPageActivity.this)
                        .setTitle("Delete Video")
                        .setMessage("Are you sure you want to delete this video?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                // Call ViewModel to delete video
                                videoViewModel.deleteVideoById(videoId);
                                findViewById(R.id.scrollable_content).setPadding(0, 0, 0, 0);

                                // Display a toast message to the user
                                Toast.makeText(VideoPageActivity.this, "Video was deleted successfully", Toast.LENGTH_SHORT).show();

                                // Redirect to MainPageActivity
                                Intent intent = new Intent(VideoPageActivity.this, MainPageActivity.class);
                                startActivity(intent);
                                finish(); // Optional: Call finish() if you don't want to keep this activity in the back stack
                            }
                        })
                        .setNegativeButton("No", null)
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .show();
            }
        });



        commentsRecyclerView = findViewById(R.id.comments_recycler_view);
        commentsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        commentList = new ArrayList<>();
        commentAdapter = new CommentAdapter(commentList, this, new CommentAdapter.CommentActionListener() {
            @Override
            public void onEditComment(int position) {
                if (isUserLoggedIn()) {
                    editComment(position);
                } else {
                    showSignInAlert();
                }
            }

            @Override
            public void onDeleteComment(int position) {
                if (isUserLoggedIn()) {
                    deleteComment(position);
                } else {
                    showSignInAlert();
                }
            }
        });
        commentsRecyclerView.setAdapter(commentAdapter);

        // Add comments to the comment list and notify the adapter
        if (comments != null) {
            for (Comment comment : comments) {
                Log.d("VideoPageActivity", "Comment: " + comment.getComment() + ", User: " + comment.getUserId());

                // Fetch display name for each comment
                userViewModel.getUserDisplayName(comment.getUserId()).observe(this, displayName -> {
                    if (displayName != null) {
                        Log.d("VideoPageActivity", "Fetched Display Name: " + displayName + " for User: " + comment.getUserId());
                        comment.setDisplayName(displayName);
                        commentAdapter.notifyDataSetChanged(); // Notify adapter to update the UI
                    } else {
                        Log.d("VideoPageActivity", "Display Name is null for User: " + comment.getUserId());
                    }
                });
            }
            commentList.addAll(comments);
            commentAdapter.notifyDataSetChanged();
        }


        relatedVideosRecyclerView = findViewById(R.id.related_videos_recycler_view);
        relatedVideosRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        relatedVideoList = getRelatedVideos(videoId); // Get related videos including the new one
        relatedVideosAdapter = new VideoAdapter(this, relatedVideoList);
        relatedVideosRecyclerView.setAdapter(relatedVideosAdapter);

        setUpLikeButton(currentUserId);
        setUpDislikeButton(currentUserId);

        addCommentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isUserLoggedIn()) {
                    String newCommentText = commentInput.getText().toString();
                    if (!newCommentText.isEmpty()) {
                        Comment newComment = new Comment(currentUserId, newCommentText); // Updated to use userId
                        commentList.add(newComment);
                        VideoStateManager.getInstance().addComment(videoId, newComment); // Save comment
                        commentAdapter.notifyItemInserted(commentList.size() - 1);
                        commentInput.setText("");
                    }
                } else {
                    showSignInAlert();
                }
            }
        });

        cancelCommentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                commentInput.setText("");
            }
        });

        if (!isUserLoggedIn()) {
            disableCommentInput();
        }
    }


    private void updateButtonColors() {
        if (isLiked) {
            likeButton.setBackgroundColor(getResources().getColor(R.color.button_darker_color));
        } else {
            likeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
        }

        if (isDisliked) {
            dislikeButton.setBackgroundColor(getResources().getColor(R.color.button_darker_color));
        } else {
            dislikeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
        }
    }

    private void setUpLikeButton(String currentUserId) {
        likeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isUserLoggedIn()) {
                    VideoStateManager videoStateManager = VideoStateManager.getInstance();
                    if (isLiked) {
                        isLiked = false;
                        likes--;
                        likeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
                    } else {
                        isLiked = true;
                        likes++;
                        likeButton.setBackgroundColor(getResources().getColor(R.color.button_darker_color));
                        if (isDisliked) {
                            isDisliked = false;
                            likes++;
                            dislikeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
                        }
                    }
                    videoStateManager.setLikeCount(videoId, likes);
                    videoStateManager.setLikedByUser(videoId, currentUserId, isLiked); // Corrected this line
                    videoStateManager.setDislikedByUser(videoId, currentUserId, isDisliked); // Corrected this line
                    likesTextView.setText("Likes: " + likes);
                } else {
                    showSignInAlert();
                }
            }
        });
    }

    private void setUpDislikeButton(String currentUserId) {
        dislikeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isUserLoggedIn()) {
                    VideoStateManager videoStateManager = VideoStateManager.getInstance();
                    if (isDisliked) {
                        isDisliked = false;
                        likes++;
                        dislikeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
                    } else {
                        isDisliked = true;
                        likes--;
                        dislikeButton.setBackgroundColor(getResources().getColor(R.color.button_darker_color));
                        if (isLiked) {
                            isLiked = false;
                            likes--;
                            likeButton.setBackgroundColor(getResources().getColor(R.color.button_default_color));
                        }
                    }
                    videoStateManager.setLikeCount(videoId, likes);
                    videoStateManager.setLikedByUser(videoId, currentUserId, isLiked); // Corrected this line
                    videoStateManager.setDislikedByUser(videoId, currentUserId, isDisliked); // Corrected this line
                    likesTextView.setText("Likes: " + likes);
                } else {
                    showSignInAlert();
                }
            }
        });
    }

    private boolean isUserLoggedIn() {
        return UserSession.getInstance().isLoggedIn();
    }

    private void disableCommentInput() {
        commentInput.setEnabled(false);
        addCommentButton.setEnabled(false);
        cancelCommentButton.setEnabled(false);
    }


    private void setUpVideoPlayer(String videoUrl) {
        Uri videoUri = Uri.parse(videoUrl);
        videoView.setVideoURI(videoUri);

        // Initialize the CustomMediaController
        CustomMediaController mediaController = new CustomMediaController(this);
        mediaController.setAnchorView(videoView);
        videoView.setMediaController(mediaController);

        // Set up listeners
        videoView.setOnPreparedListener(mp -> {
            mp.setLooping(true);
            videoView.start();
        });

        videoView.setOnErrorListener((mp, what, extra) -> {
            Toast.makeText(this, "Error playing video", Toast.LENGTH_SHORT).show();
            return true;
        });

        videoView.setOnClickListener(v -> {
            if (videoView.isPlaying()) {
                videoView.pause();
                mediaController.show(0); // Show the MediaController to indicate the video is paused
            } else {
                videoView.start();
                mediaController.hide(); // Hide the MediaController when the video is playing
            }
        });
    }



    private void editComment(int position) {
        Comment comment = commentList.get(position);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Edit Comment");

        final EditText input = new EditText(this);
        input.setText(comment.getComment());
        builder.setView(input);

        builder.setPositiveButton("Save", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String editedCommentText = input.getText().toString();
                if (!editedCommentText.isEmpty()) {
                    comment.setComment(editedCommentText);
                    VideoStateManager.getInstance().editComment(videoId, position, editedCommentText); // Edit comment
                    commentAdapter.notifyItemChanged(position);
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

    private void deleteComment(int position) {
        Comment comment = commentList.get(position);
        String videoId = getIntent().getStringExtra("VIDEO_ID");
        String commentId = comment.getCommentId(); // Assuming commentId is stored in userId field, replace with actual comment ID field if different

        commentViewModel.deleteComment(videoId, commentId).observe(this, videoSession -> {
            if (videoSession != null) {
                // Comment deleted successfully, update the comment list and notify the adapter
                commentList.remove(position);
                commentAdapter.notifyItemRemoved(position);
                Log.d("VideoPageActivity", "Comment deleted successfully");
            } else {
                Log.e("VideoPageActivity", "Failed to delete comment");
            }
        });
    }

    private void showSignInAlert() {
        new AlertDialog.Builder(this)
                .setTitle("Sign In Required")
                .setMessage("Only signed in users can perform this action.")
                .setPositiveButton("Sign In", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent(VideoPageActivity.this, LoginActivity.class);
                        startActivity(intent);
                    }
                })
                .setNegativeButton("Cancel", null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }

    private List<Video> getRelatedVideos(String videoId) {
        List<Video> relatedVideos = new ArrayList<>();
        VideoStateManager videoStateManager = VideoStateManager.getInstance();
        for (Video video : videoStateManager.getAllVideos()) {
            if (!video.getId().equals(videoId)) {
                relatedVideos.add(video);
            }
        }

        return relatedVideos;
    }
}
