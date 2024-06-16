
import './CurrentVideo.css';
import ButtonsVideo from './UserOption/ButtonsVideo';
import Comments from './UserOption/Comments';
import ScreenVideo from './ScreenVideo';


function CurrentVideo({ video, onLikeToggle, onDislikeToggle, onCommentAdd, onCommentDelete, onCommentEdit }) { // Receive video as a prop

  return (
    <div>

      <ScreenVideo
        video={video}
      />

      <ButtonsVideo
        video={video}
        onLikeToggle={onLikeToggle}
        onDislikeToggle={onDislikeToggle}
      />
      <Comments
        video={video}
        onCommentAdd={onCommentAdd}
        onCommentDelete={onCommentDelete}
        onCommentEdit={onCommentEdit}
      />

    </div>
  );
}

export default CurrentVideo;
