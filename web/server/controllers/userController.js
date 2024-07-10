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
      res.status(200).json(user);
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
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserDisplayName = async (req, res) => {
  console.log("getUserDisplayName was called");
  try {
    const displayName = await userService.getUserDisplayNameById(req.params.id);
    if (displayName) {
      console.log("getUserDisplayname says: ", displayName);
      res.json({ display_name: displayName });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUserById, getUserIdByUsername, getUserDisplayName };
