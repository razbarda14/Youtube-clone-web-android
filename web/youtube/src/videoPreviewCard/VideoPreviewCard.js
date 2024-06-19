import './VideoPreviewCard.css'; // Import the CSS file for VideoPreviewCard
import { useTheme } from '../themeContext/ThemeContext';

function VideoPreviewCard(video) {
  const { darkMode } = useTheme();

  return (
    <div className="col-4">
      <div className={`card video-preview-card card-hover-effect ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <img src={video.image} className="card-img-top" alt={video.title} />
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <p className="card-text">{video.description}</p>
          <p className="card-text">{video.viewsCount} views</p>
          <p className="card-text">Upload Date: {video.dateUploaded}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPreviewCard;
