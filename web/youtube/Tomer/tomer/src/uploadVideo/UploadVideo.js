import './UploadVideo.css';
import { useState } from 'react';

function UploadVideo({ addVideo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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
    setSuccessMessage('Video was added successfully');
    // Reset form fields
    setTitle('');
    setDescription('');
    setTopic('');
    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle main-content">
      <div className="mb-3 display-5">
        Upload Video
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* <div className="mb-3">
          <input className="form-control" type="file" id="formFile"></input>
        </div> */}

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
    </div>
  );
}

export default UploadVideo;
