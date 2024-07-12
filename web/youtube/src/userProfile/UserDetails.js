import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

function UserDetails({ userDisplayName, userImagePath, currentUser, userID, logout }) {
    // Add a backslash at the beginning if it's missing
    const correctedUserImagePath = userImagePath.startsWith('\\') ? userImagePath : '\\' + userImagePath;
    const [imageSrc, setImageSrc] = useState(correctedUserImagePath);
    const navigate = useNavigate();

    useEffect(() => {
        const img = new Image();
        img.src = correctedUserImagePath;
        img.onload = () => {
            setImageSrc(correctedUserImagePath);
        };
        img.onerror = () => {
            setImageSrc('/uploads/photos/default-user.png');
        };
    }, [correctedUserImagePath]);

    const handleDeleteUser = async () => {
        if (currentUser._id !== userID) {
            alert("You are not authorized to delete this user.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/users/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store your token in localStorage
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('User deleted successfully');
                logout();
                navigate('/');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
                    <button className="btn-primary">Edit Details</button>
                    <button className="btn-danger" onClick={handleDeleteUser}>Delete User</button>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
