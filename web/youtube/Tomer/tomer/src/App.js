import './App.css';
import VideoItem from './videoItem/VideoItem';
import UpperBar from './upperBar/UpperBar';
import TagSuggestion from './tagSuggestion/TagSuggestion';
import LeftMenu from './leftMenu/LeftMenu';

function App() {

  return (
    <div className="App">
      <UpperBar/>
      <TagSuggestion/>
    </div>

  );
}

export default App;
