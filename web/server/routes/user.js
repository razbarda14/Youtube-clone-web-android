// routes/user.js
const userController = require('../controllers/user');
const express = require('express');
const authenticateToken = require('../middleware/user');
const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/getUserId').get(userController.getUserIdByUsername); // This should be a query param
router.route('/:id').get(authenticateToken, userController.getUserById);

module.exports = router;
