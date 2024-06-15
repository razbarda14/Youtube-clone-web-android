import VideoPreviewCard from '../videoPreviewCard/VideoPreviewCard';
import videosLibray from '../videoLibrary/videosLibrary'


function VideoList() {

    const videosToShow = videosLibray.map((video, key) => {
        return <VideoPreviewCard key={key} {...video} />
    }
    );

    return (
        <div className="col-9">
            <div className="row">
                <div className="container">
                    <div className="row">
                        {videosToShow}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;