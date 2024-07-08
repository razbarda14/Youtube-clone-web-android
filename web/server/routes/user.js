const userController = require('../controllers/user');
const express = require('express');
const authenticateToken = require('../middleware/auth'); // Correct import
const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/getUserId').get(userController.getUserIdByUsername);
router.route('/:id').get(authenticateToken, userController.getUserById);

module.exports = router;
