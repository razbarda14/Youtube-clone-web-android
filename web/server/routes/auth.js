const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const authenticateToken = require('../middleware/auth');
const User = require('../models/user'); // Ensure this is imported to fetch user details
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, displayName, password } = req.body;
  try {
    const user = await registerUser(username, displayName, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginUser(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to verify user
router.get('/verify-user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
