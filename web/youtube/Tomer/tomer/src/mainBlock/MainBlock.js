import LeftMenu from '../leftMenu/LeftMenu';
import VideoItem from '../videoItem/VideoItem';
import videosLibray from '../videoLibrary/videosLibrary'


function MainBlock() {
    
  const videosList = videosLibray.map((video, key) => {
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
                {videosList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default MainBlock;