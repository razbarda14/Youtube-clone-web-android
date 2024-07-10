import { useTheme } from '../themeContext/ThemeContext';

function UserDetails({ userDisplayName, userImagePath }) {
    return (
        <div className="col-lg-2 col-md-2 col-sm-1">
            <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <img
                        src={userImagePath}
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', marginLeft:'10px', marginBottom: '10px' }}
                    />
                    <h5>{userDisplayName}</h5>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
