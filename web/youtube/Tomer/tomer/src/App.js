import './App.css';
import videos from './videoItem/videos'
import VideoItem from './videoItem/VideoItem';
import UpperBar from './upperBar/UpperBar';
import TagSuggestion from './tagSuggestion/TagSuggestion';
import LeftMenu from './leftMenu/LeftMenu';

function App() {

  const videoList = videos.map((video, key) => {
    return <VideoItem key={key} {...video} />
  }
  );

  return (
    <div className="App">
      <div>
        <UpperBar></UpperBar>
        <TagSuggestion></TagSuggestion>
        <div className="container-fluid">

          <div className="row">
            <LeftMenu></LeftMenu>
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
      </div>
    </div>

  );
}

export default App;
