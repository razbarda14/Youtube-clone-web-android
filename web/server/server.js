const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customEnv = require('custom-env');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth'); 
//require('dotenv').config(); // Load environment variables
//const session = require('express-session');
//const jwt = require('jsonwebtoken');


console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);
console.log('Secret Key in server.js:', process.env.SECRET_KEY);
mongoose.connect(process.env.CONNECTION_STRING);

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// Serve static files from the public folder
server.use(express.static(path.join(__dirname, '../youtube/build')));

// Serve the uploads folder
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const users = require('./routes/user');
server.use('/users', users);
const videoRoutes = require('./routes/videoRouter.js');
server.use('/api/videos', videoRoutes);
server.use('/auth', authRoutes); // Add this line to use the auth routes


// Serve static files from the public folder
server.use(express.static('public'));
server.use(cors());
// check if necececery
// server.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../youtube/build', 'index.html'));
// });
server.listen(process.env.PORT);