const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY; // Use the environment variable
console.log('Secret Key in authService:', secretKey); // Add this to check if the key is being loaded


const registerUser = async (username, displayName, password) => {
  if (!username || !displayName || !password) {
    throw new Error('Username, display name, or password is missing.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      display_name: displayName,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error during user registration:', error);
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
