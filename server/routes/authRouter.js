const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const authenticateToken = require('../middleware/authMiddleware');
const User = require('../models/userModel'); // Ensure this is imported to fetch user details
const upload = require('../middleware/multerConfig'); 
const router = express.Router();

// Register route
router.post('/register', upload.single('photo'), async (req, res) => {
  const { username, displayName, password } = req.body;
  const photoPath = req.file ? req.file.path : null;

  console.log('Received registration data:', { username, displayName, password, photoPath });

  try {
    const user = await registerUser(username, displayName, password, photoPath);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during user registration:', error.message);
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
