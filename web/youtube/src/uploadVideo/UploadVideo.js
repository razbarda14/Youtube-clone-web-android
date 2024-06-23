import './UploadVideo.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function UploadVideo({ addVideo, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Please enter a title for the video.');
      return;
    }

    if (!videoFile) {
      setErrorMessage('Please choose a video file.');
      return;
    }

    const newVideo = {
      id: Date.now(),
      title,
      description,
      viewsCount: '0',
      dateUploaded: new Date().toLocaleDateString('en-GB'),
      image: 'default.jpg',
      topic,
      uploader: user.userName,
      videoFile: URL.createObjectURL(videoFile),
    };

    addVideo(newVideo);
    setSuccessMessage(true);
    setTitle('');
    setDescription('');
    setTopic('');
    setVideoFile(null);
    setErrorMessage('');
  };

  const handleUploadAnother = () => {
    setSuccessMessage(false);
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle main-content">
      {!user ? (
        <div className="alert alert-warning text-center">
          Please sign in to upload a video.
          <div className="mt-3">
            <Link to="/signIn">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {!successMessage && (
            <div className="mb-3 display-5">
              Upload Video
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center success-message">
              Video was added successfully.
              <div className="mt-3">
                <Link to="/">
                  <button className="btn btn-danger me-2">Go to Main Screen</button>
                </Link>
                <button className="btn btn-secondary" onClick={handleUploadAnother}>Upload Another Video</button>
              </div>
            </div>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Topic</label>
                <input
                  className="form-control"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Video File (MP4 only)</label>
                <input
                  className="form-control"
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="text-center" style={{ margin: '10px' }}>
                <button type="submit" className="btn btn-danger">Upload</button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default UploadVideo;
