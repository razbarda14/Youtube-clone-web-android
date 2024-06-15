import LeftMenu from '../leftMenu/LeftMenu';
import ShowVideos from '../showVideos/ShowVideos';
import videoList from '../videoItem/videos'
import videos from '../videoItem/videos'


function MainBlock() {
    
  const videoList = videos.map((video, key) => {
    return <VideoItem key={key} {...video} />
  }
  );

  return (

      <div className="container-fluid">
      <div className="row">
        <LeftMenu/>
        {/* Suggested videos */}
        <div className="col-9">
          <div className="row">
            <div className="container">
              <div className="row">
                {videoList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default MainBlock;