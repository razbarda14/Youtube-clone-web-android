const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY; // Use the environment variable
console.log('Secret Key in authService:', secretKey); // Add this to check if the key is being loaded


const registerUser = async (username, displayName, password, photoPath) => {
  if (!username || !displayName || !password) {
    throw new Error('Username, display name, or password is missing.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      display_name: displayName,
      password: hashedPassword,
      image: photoPath // Add this line to save the photo path
    });
    const savedUser = await newUser.save(); // This is the method that saves the user to MongoDB
    return savedUser;
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

module.exports = { registerUser, loginUser };
