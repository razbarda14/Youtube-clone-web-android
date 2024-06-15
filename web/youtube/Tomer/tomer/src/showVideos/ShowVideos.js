import videos from '../videoItem/videos'
import VideoItem from '../videoItem/VideoItem';

function ShowVideos() {
    const getVideos = videos.map((video, key) => {
        return <VideoItem key={key} {...video} />
    }
    );

    return (
        <div className="col-9">
            <div className="row">
                <div className="container">
                    <div className="row">
                        {getVideos}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowVideos;