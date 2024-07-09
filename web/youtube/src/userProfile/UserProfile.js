import UserDetails from "./UserDetails";
import VideoList from '../videoList/VideoList';
import React, { useState, useEffect } from 'react';

function UserProfile() {
    const [userVideoList, setUserVideoList] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/videos');
            const data = await response.json();
            setUserVideoList(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="row">
                    <UserDetails />
                    <VideoList videos={userVideoList} />
                </div>
            </div>
        </div>

    );
}

export default UserProfile;
