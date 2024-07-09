const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const videoRoutes = require('./routes/videoRouter');

const server = express();

console.log('Connection String:', process.env.CONNECTION_STRING);
console.log('Port:', process.env.PORT);
console.log('Secret Key in server.js:', process.env.SECRET_KEY);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// Serve static files from the build and uploads folders
server.use(express.static(path.join(__dirname, '../youtube/build')));
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/api/videos', videoRoutes);

// Serve static files from the public folder
server.use(express.static('public'));

// Catch-all handler to serve the React app for any route not handled by API routes
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../youtube/build', 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
