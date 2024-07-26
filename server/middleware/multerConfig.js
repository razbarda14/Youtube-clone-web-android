const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, 'uploads/videos/');
        } else if (file.fieldname === 'thumbnailFile') {
            cb(null, 'uploads/thumbnails/');
        } else if (file.fieldname === 'photo') {
            cb(null, 'uploads/photos/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
