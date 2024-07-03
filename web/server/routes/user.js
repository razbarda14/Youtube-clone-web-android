const userController = require('../controllers/user');
const express = require('express');
var router = express.Router();

router.route('/').post(userController.createUser);
router.route('/getUserId').get(userController.getUserIdByUsername); // This should be a query param
router.route('/:id').get(userController.getUserById);

module.exports = router;
