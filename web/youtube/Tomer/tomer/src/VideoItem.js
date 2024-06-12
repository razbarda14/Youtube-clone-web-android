function VideoItem(video) {
    return (
        <div>
            <div className="card" id="cardImg">
                <img src="./img/live-music.png" class="card-img-top" alt="..."></img>
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