import UpperBar from "../upperBar/UpperBar";
import TagSuggestion from "../tagSuggestion/TagSuggestion";
import MainBlock from "../mainBlock/MainBlock";

function MainScreen() {
    return (

        <div className="main-content">
            <TagSuggestion/>
            <MainBlock/>
        </div>

    );
}

export default MainScreen;