const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { username, password, display_name } = req.body;
    const user = await userService.createUser(username, password, display_name);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        display_name: user.display_name,
        image: user.image
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getUserIdByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await userService.getUserByUsername(username);
    if (user) {
      res.status(200).json({ id: user._id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserDisplayName = async (req, res) => {
  try {
    const displayName = await userService.getUserDisplayNameById(req.params.id);
    if (displayName) {
      res.json({ display_name: displayName });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserImagePath = async (req, res) => {
  try {
    const image = await userService.getUserImagePathById(req.params.id);
    if (image) {
      res.json({ image: image });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, displayName, password } = req.body;
  const photoPath = req.file ? (req.file.path.startsWith('\\') ? req.file.path : '\\' + req.file.path) : null;

  try {
    const user = await userService.registerUser(username, displayName, password, photoPath);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await userService.loginUser(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await userService.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { display_name } = req.body;

    // Check if the user ID in the token matches the user ID in the request
    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Call the service to update the display name
    const updatedUser = await userService.updateUserDisplayName(id, display_name);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserIdByUsername,
  getUserDisplayName,
  getUserImagePath,
  registerUser,
  loginUser,
  deleteUser,
  updateUser
};