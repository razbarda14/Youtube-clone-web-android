// routes/auth.js
const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const authenticateToken = require('../middleware/auth');
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
router.get('/verify-user', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'User is authenticated' });
});

module.exports = router;
