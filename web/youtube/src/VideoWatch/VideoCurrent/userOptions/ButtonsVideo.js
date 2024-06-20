import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../themeContext/ThemeContext';

function ButtonsVideo({ video, onLikeToggle, onDislikeToggle }) {
  const [, setLikes] = useState(video.likes);
  const [, setIsLiked] = useState(false);
  const [, setIsDisliked] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    setLikes(video.likes);
    setIsLiked(video.isLiked);
    setIsDisliked(video.isDisliked);
  }, [video]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div>
      <button
        className={`btn ${darkMode ? 'btn-dark-mode' : 'btn-light-mode'} ${video.isLiked ? 'active-like' : ''}`}
        onClick={() => onLikeToggle(video.id)}
      >
        {video.likes}
        <i className={`bi ${video.isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} img-fluid`}></i>
      </button>

      <button
        className={`btn ${darkMode ? 'btn-dark-mode' : 'btn-light-mode'} ${video.isDisliked ? 'active-dislike' : ''}`}
        onClick={() => onDislikeToggle(video.id)}
      >
        <i className={`bi ${video.isDisliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'} img-fluid`}></i>
      </button>

      <button className={`btn ${darkMode ? 'btn-dark-mode' : 'btn-light-mode'}`} onClick={handleShare}>
        <i className="bi bi-share"></i>
      </button>

      <button className={`btn ${darkMode ? 'btn-dark-mode' : 'btn-light-mode'}`}>
        <i className="bi bi-bell"></i>
      </button>
    </div>
  );
}

export default ButtonsVideo;
