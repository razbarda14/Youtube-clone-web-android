const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
//const session = require('express-session');
//const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

// use the static file
server.use(express.static(path.join(__dirname,
                                    '../youtube/build')));

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING);

const users = require('./routes/user');
server.use('/users', users);

// Serve static files from the public folder
//server.use(express.static('public'));
server.use(cors());

// Catch-all handler to serve the React app for any route not handled by API routes
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../youtube/build', 'index.html'));
});

server.listen(process.env.PORT);