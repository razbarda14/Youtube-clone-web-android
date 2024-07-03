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

module.exports = { createUser };
