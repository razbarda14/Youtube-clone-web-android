import './VideoPreviewCard.css';
import { useTheme } from '../themeContext/ThemeContext';
import { Link } from 'react-router-dom';

function VideoPreviewCard({ video }) {
  const { darkMode } = useTheme();

  return (
    <div className="col-4">
      <Link to={`/WatchVideo/${video.id}`} className='no-underline'>
        <div className={`card video-preview-card card-hover-effect ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <video
            className="card-img-top"
            width="400"
            controls={false}
            preload="metadata"
          >
            <source src={`${video.videoPath}#t=1`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">{video.channel}</p>
            <p className="card-text">{video.description}</p>
            <p className="card-text">{video.dateUploaded} • {video.viewsCount} views</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VideoPreviewCard;
