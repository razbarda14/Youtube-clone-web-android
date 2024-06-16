import './UploadVideo.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function UploadVideo({ addVideo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if title is provided
    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }

    const newVideo = {
      id: Date.now(), // Generate a unique ID based on the current timestamp
      title,
      description,
      viewsCount: '0', // Initially zero views
      dateUploaded: new Date().toLocaleDateString('en-GB'), // Format date as DD/MM/YYYY
      image: 'default.jpg', // Placeholder image, update this as needed
      topic
    };
    addVideo(newVideo);
    // Show success message
    setSuccessMessage(true);
    // Reset form fields
    setTitle('');
    setDescription('');
    setTopic('');
    setErrorMessage('');
  };

  const handleUploadAnother = () => {
    setSuccessMessage(false);
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle main-content">
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

          <div className="text-center" style={{ margin: '10px' }}>
            <button type="submit" className="btn btn-danger">Upload</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UploadVideo;
