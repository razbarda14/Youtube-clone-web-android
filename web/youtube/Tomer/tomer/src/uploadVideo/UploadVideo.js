import './UploadVideo.css';

function UploadVideo() {
    return (
            <div className="position-absolute top-50 start-50 translate-middle main-content">

                <div className="mb-3 display-5">
                    Upload Video
                </div>

                <form>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input className="form-control"></input>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="file" id="formFile"></input>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input className="form-control"></input>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Topic</label>
                        <input className="form-control"></input>
                    </div>

                    <div className="text-center" style={{margin: '10px'}}>
                        <button type="submit" className="btn btn-danger">Upload</button>
                    </div>

                </form>
            </div>
    );
}

export default UploadVideo;