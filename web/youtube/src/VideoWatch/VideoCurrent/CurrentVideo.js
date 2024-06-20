import React, { useEffect, useRef } from 'react';
import './CurrentVideo.css';
import ScreenVideo from './ScreenVideo';
import ButtonsVideo from './userOptions/ButtonsVideo';
import Comments from './userOptions/Comments'

function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit, resetComments, setResetComments }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (resetComments) {
      setResetComments(false);
    }

    // Pause the video when the component unmounts or when a new video is selected
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [video, resetComments, setResetComments]);

  return (
    <div className='main-content'>
      <ScreenVideo video={video} videoRef={videoRef} />
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
