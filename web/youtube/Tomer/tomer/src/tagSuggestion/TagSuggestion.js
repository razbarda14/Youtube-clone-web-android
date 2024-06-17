import './TagSuggestion.css'; // Import the CSS file for TagSuggestion

function TagSuggestion({ setTagFilter }) {
  const handleButtonClick = (event) => {
    const topic = event.target.textContent.toLowerCase();
    setTagFilter(topic === 'all' ? 'all' : topic);
  };

  return (
    <div className="row" style={{ padding: '5px' }}>
      <div className="col-1"></div>
      <div className="col-11 align-middle">
        <div className="d-flex justify-content-evenly">
          <button type="button" className="btn btn-dark" onClick={handleButtonClick}>All</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Music</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Sports</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Food</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Gaming</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Languages</button>
          <button type="button" className="btn btn-light" onClick={handleButtonClick}>Travel</button>
        </div>
      </div>
    </div>
  );
}

export default TagSuggestion;
