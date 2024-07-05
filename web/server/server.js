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

// Serve static files from the public folder
server.use(cors());
server.use(express.static(path.join(__dirname, '../youtube/build')));

// Use configuration file
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const videoRoutes = require('./routes/videoRouter.js');
server.use('/videos', videoRoutes);

server.listen(process.env.PORT);