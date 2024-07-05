const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

// use the static file
server.use(express.static(path.join(__dirname,
                                    '../youtube/build')));

const users = require('./routes/user');
server.use('/users', users);
server.use('/auth', authRoutes); // Add this line to use the auth routes


// Serve static files from the public folder
//server.use(express.static('public'));
server.use(cors());

// Catch-all handler to serve the React app for any route not handled by API routes
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../youtube/build', 'index.html'));
});

server.listen(process.env.PORT);