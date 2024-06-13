import './UpperBar.css'; // Import the CSS file for upperBar
import youtubeLogo from "../img/youtube-logo.jpg"

function UpperBar() {
    return (
        <div className="container-fluid bg-white">
            {/*
              <!-- Icon, search bar, sign in bar -->
            */}
            <div className="row" style={{ height: '50px' }}>

                <div className="col-4">
                    <div>
                        <button type="button" className="btn btn-light align-middle">
                            <i className="bi bi-list"></i>
                        </button>

                        <img src={youtubeLogo} alt="Youtube Icon" height="60px"></img>

                    </div>
                </div>

                <div className="col-4">
                    <div className="input-group mb-3 p-2">
                        <input
                            type="text"
                            className="form-control no-outline"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2">
                        </input>
                        <button className="btn btn-outline-secondary custom-button" type="button" id="button-addon2">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/*
                Intentionally empty space
                */}
                <div className="col-2"></div>

                <div className="col-2">
                    <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-moon"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary align-middle">Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default UpperBar;