
function ScreenVideo({ video }) {
    return (
        <div>

            {/* Watch Current Video */}
            <div className="current-video">
                <div className="mb-3">
                    <video key={video.id} className="video-player" controls poster={video.thumbnail}>
                        <source src={video.videoUrl} type="video/mp4" />
                    </video>
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <div className="d-flex justify-content-between">
                    <span>{video.channel}
                        <p> {video.views} • {video.uploadDate}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default ScreenVideo