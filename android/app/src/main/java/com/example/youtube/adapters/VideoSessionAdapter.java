package com.example.youtube.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.youtube.R;
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
        if (thumbnailPath != null && !thumbnailPath.isEmpty()) {
            Glide.with(context)
                    .load(thumbnailPath)
                    .into(holder.thumbnail);
        }
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
        TextView title, description, viewsCount;
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
