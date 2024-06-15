import './App.css';
import UpperBar from './upperBar/UpperBar';
import TagSuggestion from './tagSuggestion/TagSuggestion';
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
