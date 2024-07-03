const User = require('../models/user');

const createUser = async (username, password, display_name) => {
  const user = new User({ username: username, 
                          password: password,
                          display_name: display_name });

  return await user.save();
};

module.exports = {createUser};
