import './UpperBar.css'; // Import the CSS file for upperBar
import youtubeLogo from "../img/youtube-logo.jpg"
import { Route, Routes, Link } from 'react-router-dom';


function UpperBar() {
    return (
        <div className="container-fluid upper-bar">

            <div className="row">

                <div className="col-4">
                    <nav>
                        <Link to='/'>
                            <img src={youtubeLogo} alt="Clickable" height="60px"></img>
                        </Link>
                    </nav>
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

                <div className="col-2">
                    <nav>
                        <Link to='/uploadVideo'>
                            <button type="button" className="btn btn-outline-secondary">
                                <i class="bi bi-upload"></i>
                            </button>
                        </Link>
                    </nav>
                </div>

                <div className="col-2">

                    <button type="button" className="btn btn-outline-secondary">
                        <i className="bi bi-moon"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary align-middle">Sign in</button>
                </div>
            </div>
        </div >
    );
}

export default UpperBar;