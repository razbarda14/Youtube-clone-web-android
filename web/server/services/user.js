const mongoose = require('mongoose');
const User = require('../models/userModel');

const createUser = async (username, password, display_name) => {
  const user = new User({
    username: username,
    password: password,
    display_name: display_name
  });
  return await user.save();
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }
  const user = await User.findById(id);
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

module.exports = { createUser, getUserById, getUserByUsername };
