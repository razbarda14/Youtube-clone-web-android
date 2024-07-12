const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Video = require('../models/videoModel');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const createUser = async (username, password, display_name, image) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username: username,
    password: hashedPassword,
    display_name: display_name,
    image: image // Store the image path
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

const getUserDisplayNameById = async (id) => {
  const user = await User.findById(id, 'display_name');
  return user ? user.display_name : null;
};

const getUserImagePathById = async (id) => {
  const user = await User.findById(id, 'image');
  return user ? user.image : null;
};

const registerUser = async (username, display_name, password, image) => {
  if (!username || !display_name || !password) {
    throw new Error('Username, display name, or password is missing.');
  }
  try {
    const user = await createUser(username, password, display_name, image);
    return user;
  } catch (error) {
    console.error('Error during user registration:', error.message);
    throw new Error('Error during registration');
  }
};

const loginUser = async (username, password) => {
  if (!username || !password) {
    throw new Error('Username or password is missing.');
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    return { user, token };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error during login');
  }
};

const deleteUser = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }

  // Delete all videos associated with the user
  await Video.deleteMany({ uploaderId: id });

  // Delete the user
  await User.findByIdAndDelete(id);
};

const updateUserDisplayName = async (id, display_name) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }

  // // Check if the new display name is already taken
  // const existingUser = await User.findOne({ display_name: display_name });
  // if (existingUser && existingUser._id.toString() !== id) {
  //   throw new Error('Display name already in use');
  // }

  // Update the display name
  const user = await User.findByIdAndUpdate(
      id,
      { display_name: display_name },
      { new: true }
  );

  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUserDisplayNameById,
  getUserImagePathById,
  registerUser,
  loginUser,
  deleteUser,
  updateUserDisplayName
};
