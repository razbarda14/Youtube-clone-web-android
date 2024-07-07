const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customEnv = require('custom-env');
const mongoose = require('mongoose');
const path = require('path');
//const session = require('express-session');
//const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// Serve static files from the public folder
server.use(express.static(path.join(__dirname, '../youtube/build')));

// Serve the uploads folder
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use configuration file
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING);

const videoRoutes = require('./routes/videoRouter.js');
server.use('/api/videos', videoRoutes);

server.listen(process.env.PORT);