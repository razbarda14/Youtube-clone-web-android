const userController = require('../controllers/userController');
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import
const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/getUserId').get(userController.getUserIdByUsername);
router.route('/:id').get(authenticateToken, userController.getUserById);

module.exports = router;
