import TagSuggestion from '../tagSuggestion/TagSuggestion';
import MainBlock from '../mainBlock/MainBlock';

function MainScreen({ videos, setTagFilter }) {
  return (
    <div className="main-content">
      <TagSuggestion setTagFilter={setTagFilter} />
      <MainBlock videos={videos} />
    </div>
  );
}

export default MainScreen;
