import './ShowVideos.css';
import videos from '../videoPreviewCard/videos';
import VideoPreviewCard from '../videoPreviewCard/VideoPreviewCard';

function ShowVideos() {
    const getVideos = videos.map((video, key) => {
        return <VideoPreviewCard key={key} {...video} />
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