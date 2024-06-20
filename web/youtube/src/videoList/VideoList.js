import VideoPreviewCard from '../videoPreviewCard/VideoPreviewCard';

function VideoList({ videos }) {
  const videosToShow = videos.map((video, key) => {
    return <VideoPreviewCard key={key} video={video} />;
  });

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
