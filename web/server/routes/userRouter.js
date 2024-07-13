const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController.js');
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.route('/')
  .post(userController.createUser);

router.route('/getUserId')
  .get(userController.getUserIdByUsername);

router.route('/:id')
  .get(authenticateToken, userController.getUserById);

router.route('/:id')
    .put(authenticateToken, userController.updateUser);

router.route('/:id')
  .delete(authenticateToken, userController.deleteUser);

router.route('/:id/getDisplayName')
  .get(userController.getUserDisplayName);

router.route('/:id/getImagePath')
    .get(userController.getUserImagePath);

router.route('/:id/videos')
    .get(videoController.getVideosByUploader);

router.post('/register', upload.single('photo'), userController.registerUser);
// router.post('/login', userController.loginUser);
router.get('/verify-user', authenticateToken, userController.getUserById);

module.exports = router;
