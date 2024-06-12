import './TagSuggestion.css'; // Import the CSS file for VideoItem

function TagSuggestion() {
    return (
        <div className="row" style={{ padding: '5px' }}>

        {/* Intentionally empty space */}
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
    );
}

export default TagSuggestion;