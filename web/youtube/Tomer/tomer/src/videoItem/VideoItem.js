import './VideoItem.css'; // Import the CSS file for VideoItem

function VideoItem(video) {
    return (
        <div className="col-4">
            <div className="card card-hover-effect">
                <img src={video.image} class="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">{video.description}</p>
                    <p className="card-text">{video.viewsCount} views, {video.dateUploaded}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;