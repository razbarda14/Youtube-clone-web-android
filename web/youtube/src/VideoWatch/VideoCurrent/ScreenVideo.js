import React, { useEffect, useRef } from 'react';

function ScreenVideo({ video, videoRef }) {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video, videoRef]);

  return (
    <div>
      <div className="current-video">
        <div className="mb-3">
          {video ? (
            <video
              ref={videoRef}
              key={video.id}
              className="video-player"
              controls
              poster={video.thumbnail}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {video && (
          <>
            <h4>{video.title}</h4>
            <p>{video.channel}</p>
            <p>{video.description}</p>
            <div className="d-flex justify-content-between">
              <span>
                <p>Uploaded: {video.uploadDate} • {video.views} views</p>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScreenVideo;
