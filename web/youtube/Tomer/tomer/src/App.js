import './App.css';
import VideoItem from './VideoItem';
import abelton from "./img/ableton.jpeg"
import youtubeLogo from "./img/youtube-logo.jpg"


function App() {

  const videos = [
    {title: 'a', description: 'aa', viewsCount: '100k', dateUploaded: '2a' },
    {title: 'b', description: 'aa', viewsCount: '52k', dateUploaded: '2a' },
    {title: 'c', description: 'aa', viewsCount: '86k', dateUploaded: '2a' },
    {title: 'd', description: 'aa', viewsCount: '90k', dateUploaded: '2a' },
    {title: 'e', description: 'aa', viewsCount: '78k', dateUploaded: '2a' },
    {title: 'f', description: 'aa', viewsCount: '150k', dateUploaded: '2a' }
  ]

  const videoList = videos.map((video, key) => {
    return <VideoItem key={key} title="t" description="des" viewsCount="vc" dateUploaded="du"/>
  }
);

  return (
    <div className="App">
      <div>
        {/* Upper row container - row 1
            <!-- <div className="container-fluid fixed-top bg-white"> -->
        */}
        <div className="container-fluid bg-white">
          {/*
              <!-- Icon, search bar, sign in bar -->
            */}
          <div className="row" style={{ height: '50px' }}>

            <div className="col-4">
              <div>
                <button type="button" className="btn btn-light align-middle">
                  <i className="bi bi-list"></i>
                </button>

                <img src={youtubeLogo} alt="Youtube Icon" height="60px"></img>

              </div>
            </div>

            <div className="col-4">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <i className="bi bi-search align-middle" type="submit"></i>
              </form>
            </div>

            {/*
                Intentionally empty space
                */}
            <div className="col-2"></div>

            <div className="col-2">
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-moon"></i>
              </button>
              <button type="button" className="btn btn-outline-primary align-middle">Sign in</button>
            </div>
          </div>

          {/* Suggested tags */}
          <div className="row" style={{ padding: '5px' }}>
            {/* 
                Intentionally empty space*/}
            <div className="col-3"></div>

            <div className="col-9 align-middle">
              <div className="d-flex justify-content-evenly">
                <button type="button" className="btn btn-dark">All</button>
                <button type="button" className="btn btn-light" data-bs-toggle="popover">Music</button>
                <button type="button" className="btn btn-light">Sports</button>
                <button type="button" className="btn btn-light">Italian cuisine</button>
                <button type="button" className="btn btn-light">News</button>
                <button type="button" className="btn btn-light">Gaming</button>
              </div>
            </div>

          </div>



        </div>
        <div className="container-fluid">

          <div className="row">

            {/* Left tool bar col
              add postion-fixed to the next div class to make it fixed, then padding-left the videos
            */}
            <div className="col-2">
              <div className="row">
                <div className="col">
                  {/*Left tool bar*/}
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Home
                      <i className="bi bi-house"></i>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      My Profile
                      <i className="bi bi-person"></i>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Subscriptions
                      <i className="bi bi-card-list"></i>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Your channel
                      <i className="bi bi-person-square"></i>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      History
                      <i className="bi bi-clock-history"></i>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Liked videos
                      <i className="bi bi-hand-thumbs-up"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Suggested videos */}
            <div className="col-9">

              <div className="row">

                <div className="container">

                  <div className="row">

                    <div className="col-4">
                      <VideoItem></VideoItem>
                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>

                    <div className="col-4">

                    </div>
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
