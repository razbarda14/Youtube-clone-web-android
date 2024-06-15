import LeftMenu from '../leftMenu/LeftMenu';
import VideoList from '../videoList/VideoList';

function MainBlock({ videos }) {
    
  return (

      <div className="container-fluid">
      <div className="row">
        <LeftMenu/>
        <VideoList videos={ videos }/>
      </div>
    </div>
    
  );
}

export default MainBlock;