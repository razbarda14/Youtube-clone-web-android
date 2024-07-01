const User = require('../models/user');

const createUser = async (username, password) => {
  const user = new User({ username: username });
  if (published) user.published = published;
  return await user.save();
};

module.exports = {createUser};
