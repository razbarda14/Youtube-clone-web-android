const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); // Correct import
const express = require('express');

const router = express.Router();

router.post('/', userController.loginUser);

module.exports = router;
