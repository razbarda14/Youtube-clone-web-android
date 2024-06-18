import './VideoPreviewCard.css'; // Import the CSS file for VideoPreviewCard

function VideoPreviewCard(video) {
  return (
    <div className="col-4">
      <div className="card video-preview-card card-hover-effect">
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
