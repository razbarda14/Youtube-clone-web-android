const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const mongoose = require('mongoose');
const path = require('path');
//const session = require('express-session');
//const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname,
                                    '../youtube/build')));

// Serve static files from the public folder
server.use(express.static('public'));
server.use(cors());



server.listen(8080);