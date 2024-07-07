const userService = require('../services/user');

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

module.exports = { createUser, getUserById, getUserIdByUsername };
