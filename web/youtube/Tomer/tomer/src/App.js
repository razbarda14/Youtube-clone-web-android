import './App.css';
import VideoItem from './videoItem/VideoItem';
import UpperBar from './upperBar/UpperBar';
import TagSuggestion from './tagSuggestion/TagSuggestion';
import LeftMenu from './leftMenu/LeftMenu';
import MainBlock from './mainBlock/MainBlock';

function App() {

  return (
    <div className="App">
      <UpperBar/>
      <TagSuggestion/>
      <MainBlock/>
    </div>

  );
}

export default App;
