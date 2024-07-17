package com.example.youtube.adapters;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.youtube.R;
import com.example.youtube.activities.VideoPageActivity;
import com.example.youtube.model.VideoSession;

import java.util.List;

public class VideoSessionAdapter extends RecyclerView.Adapter<VideoSessionAdapter.VideoViewHolder> {
    private Context context;
    private List<VideoSession> videos;

    public VideoSessionAdapter(Context context, List<VideoSession> videos) {
        this.context = context;
        this.videos = videos;
    }

    @NonNull
    @Override
    public VideoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.video_item, parent, false);
        return new VideoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VideoViewHolder holder, int position) {
        VideoSession video = videos.get(position);
        holder.title.setText(video.getTitle());

        String thumbnailPath = video.getThumbnailPath();

        // Assuming the server base URL is http://10.0.2.2:8080
        String fullThumbnailPath = "http://10.0.2.2:8080" + thumbnailPath;

        if (thumbnailPath != null && (thumbnailPath.startsWith("android.resource://") || thumbnailPath.startsWith("content://") || thumbnailPath.startsWith("file://") || thumbnailPath.startsWith("http://") || thumbnailPath.startsWith("https://"))) {
            // If the thumbnailPath is a URI or URL, load using Glide directly
            Glide.with(context)
                    .load(thumbnailPath)
                    .into(holder.thumbnail);
        } else {
            // Load using the full URL
            Glide.with(context)
                    .load(fullThumbnailPath)
                    .into(holder.thumbnail);
        }


        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, VideoPageActivity.class);
            intent.putExtra("VIDEO_ID", video.getId());
            intent.putExtra("VIDEO_TITLE", video.getTitle());
            intent.putExtra("VIDEO_URL", video.getVideoPath());  // Pass the video URL
            intent.putExtra("IMAGE_URL", video.getThumbnailPath());
            intent.putExtra("VIDEO_LIKES", video.getLikes());
            intent.putExtra("VIDEO_VIEWS", video.getViewsCount());
            intent.putExtra("VIDEO_UPLOAD_DATE", video.getDateUploaded());
            intent.putExtra("VIDEO_DESCRIPTION", video.getDescription());
            intent.putExtra("VIDEO_TOPIC", video.getTopic());
            intent.putExtra("VIDEO_CHANNEL", video.getUploaderId());
            context.startActivity(intent);
        });

    }



    @Override
    public int getItemCount() {
        return videos.size();
    }

    public void updateList(List<VideoSession> newVideos) {
        videos = newVideos;
        notifyDataSetChanged();
    }

    public static class VideoViewHolder extends RecyclerView.ViewHolder {
        TextView title, description;
        ImageView thumbnail;

        public VideoViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.video_title);
//            description = itemView.findViewById(R.id.video_description);
//            viewsCount = itemView.findViewById(R.id.video_views);
            thumbnail = itemView.findViewById(R.id.video_image);
        }
    }
}
