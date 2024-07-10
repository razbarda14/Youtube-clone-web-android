import { useState, useEffect } from 'react';

function UserDetails({ userDisplayName, userImagePath }) {
    // Add a backslash at the beginning if it's missing
    const correctedUserImagePath = userImagePath.startsWith('\\') ? userImagePath : '\\' + userImagePath;

    const [imageSrc, setImageSrc] = useState(correctedUserImagePath);

    useEffect(() => {
        const img = new Image();
        img.src = correctedUserImagePath;
        img.onload = () => {
            console.log("Image loaded successfully:", correctedUserImagePath);
            setImageSrc(correctedUserImagePath);
        };
        img.onerror = () => {
            console.log("Image failed to load, using default image:", 'uploads/photos/default-user.png');
            setImageSrc('uploads/photos/default-user.png');
        };
    }, [correctedUserImagePath]);

    console.log("UserDetails - correctedUserImagePath: ", correctedUserImagePath);
    console.log("UserDetails - imageSrc: ", imageSrc);

    return (
        <div className="col-lg-2 col-md-2 col-sm-1">
            <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <img
                        src={imageSrc}
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', marginLeft: '10px', marginBottom: '10px' }}
                    />
                    <h5>{userDisplayName}</h5>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
