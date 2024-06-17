import React, { useEffect } from 'react';
import './CurrentVideo.css';
import ButtonsVideo from './UserOption/ButtonsVideo';
import Comments from './UserOption/Comments';
import ScreenVideo from './ScreenVideo';

function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, setResetComments }) {
  useEffect(() => {
    if (resetComments) {
      setResetComments(false);
    }
  }, [video, resetComments, setResetComments]);

  return (
    <div>
      <ScreenVideo video={video} />
      <ButtonsVideo video={video} onLikeToggle={onLikeToggle} onDislikeToggle={onDislikeToggle} />
      <Comments
        video={video}
        onCommentAdd={onCommentAdd}
        onCommentDelete={onCommentDelete}
        onCommentEdit={onCommentEdit}
        resetComments={resetComments}
      />
    </div>
  );
}

export default CurrentVideo;
