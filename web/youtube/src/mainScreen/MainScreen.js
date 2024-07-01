import TagSuggestion from '../tagSuggestion/TagSuggestion';
import MainBlock from '../mainBlock/MainBlock';

function MainScreen({ videos, setTagFilter }) {
  return (
    <div className="main-content">
      <TagSuggestion setTagFilter={setTagFilter} />
        <input></input>
        <button onclick="create()">Add</button><br>
          async function create() {
            const data = await fetch('http://localhost:8080/users', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: document.getElementsByTagName('input')[0].value })
            })
            users = await data.json();
            console.log(users);
          }


      <MainBlock videos={videos} />
    </div>
  );
}

export default MainScreen;
