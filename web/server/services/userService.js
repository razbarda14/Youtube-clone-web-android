const mongoose = require('mongoose');
const UserService = require('../models/userModel');

const createUser = async (username, password, display_name) => {
  const user = new UserService({
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
  const user = await UserService.findById(id);
  return user;
};

const getUserByUsername = async (username) => {
  const user = await UserService.findOne({ username: username });
  return user;
};
const getUserDisplayNameById = async (id) => {
  console.log("getUserDisplayNameById in the service was called");
  const user = await UserModel.findById(id, 'display_name');
  console.log("found: ", user);
  return user ? user.display_name : UNKWN;
};


module.exports = { createUser, getUserById, getUserByUsername, getUserDisplayNameById };
