const userService = require('../services/user');

const createUser = async (req, res) => {
  res.json(await userService.createUser(req.body.username));
};

module.exports = { createUser };
