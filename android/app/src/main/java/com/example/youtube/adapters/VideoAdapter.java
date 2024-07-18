package com.example.youtube.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.youtube.R;
import com.example.youtube.entities.Video;
import com.example.youtube.activities.VideoPageActivity;

import java.util.List;

public class VideoAdapter extends RecyclerView.Adapter<VideoAdapter.VideoViewHolder> {

    private List<Video> videoList;
    private Context context;

    public VideoAdapter(Context context, List<Video> videoList) {
        this.context = context;
        this.videoList = videoList;
    }

    @NonNull
    @Override
    public VideoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.video_item, parent, false);
        return new VideoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VideoViewHolder holder, int position) {
        Video video = videoList.get(position);
        holder.videoTitle.setText(video.getTitle());

        String imageUrl = video.getImageUrl();
        if (imageUrl.startsWith("android.resource://") || imageUrl.startsWith("content://") || imageUrl.startsWith("file://") || imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
            // If the imageUrl is a URI or URL, load using Glide directly
            Glide.with(context)
                    .load(imageUrl)
                    .into(holder.videoImage);
        } else {
            // Otherwise, assume it's a resource identifier
            int imageResourceId = context.getResources().getIdentifier(imageUrl, "drawable", context.getPackageName());
            Glide.with(context)
                    .load(imageResourceId)
                    .into(holder.videoImage);
        }

        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, VideoPageActivity.class);
            intent.putExtra("VIDEO_ID", video.getId());
            intent.putExtra("VIDEO_TITLE", video.getTitle());
            intent.putExtra("VIDEO_URL", video.getVideoUrl());  // Pass the video URL
            intent.putExtra("IMAGE_URL", video.getImageUrl());
            intent.putExtra("VIDEO_LIKES", video.getNumLikes());
            intent.putExtra("VIDEO_VIEWS", video.getNumViews());
            intent.putExtra("VIDEO_UPLOAD_DATE", video.getUploadDate());
            intent.putExtra("VIDEO_DESCRIPTION", video.getDescription());
            intent.putExtra("VIDEO_TOPIC", video.getTopic());
            intent.putExtra("VIDEO_CHANNEL", video.getChannel());
            context.startActivity(intent);
        });
    }




    @Override
    public int getItemCount() {
        return videoList.size();
    }

    public void updateList(List<Video> newList) {
        videoList = newList;
        notifyDataSetChanged();
    }

    static class VideoViewHolder extends RecyclerView.ViewHolder {

        ImageView videoImage;
        TextView videoTitle;

        public VideoViewHolder(@NonNull View itemView) {
            super(itemView);
            videoImage = itemView.findViewById(R.id.video_image);
            videoTitle = itemView.findViewById(R.id.video_title);
        }
    }
}
