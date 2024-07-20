package com.example.youtube.adapters;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.youtube.R;
import com.example.youtube.entities.Comment;
import java.util.List;

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.CommentViewHolder> {

    private List<Comment> commentList;
    private Context context;
    private CommentActionListener actionListener;

    public interface CommentActionListener {
        void onEditComment(int position);
        void onDeleteComment(int position);
    }

    public CommentAdapter(List<Comment> commentList, Context context, CommentActionListener actionListener) {
        this.commentList = commentList;
        this.context = context;
        this.actionListener = actionListener;
    }

    @NonNull
    @Override
    public CommentViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_comment, parent, false);
        return new CommentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CommentViewHolder holder, @SuppressLint("RecyclerView") int position) {
        Comment comment = commentList.get(position);

        // Check if displayName is available, otherwise use userId
        String displayName = comment.getDisplayName() != null ? comment.getDisplayName() : (String) comment.getUserId();
        holder.commentUserName.setText(displayName);


        //holder.commentUserName.setText(comment.getUserId());
        holder.commentText.setText(comment.getComment()); // Ensure this line sets the comment text correctly
        holder.editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                actionListener.onEditComment(position);
            }
        });
        holder.deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                actionListener.onDeleteComment(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    public class CommentViewHolder extends RecyclerView.ViewHolder {
        TextView commentUserName;
        TextView commentText;
        Button editButton;
        Button deleteButton;

        public CommentViewHolder(@NonNull View itemView) {
            super(itemView);
            commentUserName = itemView.findViewById(R.id.comment_user_name);
            commentText = itemView.findViewById(R.id.comment_text);
            editButton = itemView.findViewById(R.id.edit_button);
            deleteButton = itemView.findViewById(R.id.delete_button);
        }
    }
}
