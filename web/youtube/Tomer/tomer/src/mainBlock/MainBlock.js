import LeftMenu from '../leftMenu/LeftMenu';
import VideoList from '../videoList/VideoList';

function MainBlock() {
    
  return (
      <div className="container-fluid">
      <div className="row">
        <LeftMenu/>
        <VideoList/>
      </div>
    </div>
    );
}

export default MainBlock;