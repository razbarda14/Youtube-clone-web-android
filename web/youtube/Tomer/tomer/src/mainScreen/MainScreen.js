import UpperBar from "../upperBar/UpperBar";
import TagSuggestion from "../tagSuggestion/TagSuggestion";
import MainBlock from "../mainBlock/MainBlock";

function MainScreen({ videos }) {
    return (

        <div className="main-content">
            <TagSuggestion/>
            <MainBlock videos={videos}/>
        </div>

    );
}

export default MainScreen;