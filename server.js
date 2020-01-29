const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

const multer = require('multer');
const path = require('path');
storage = multer.diskStorage({
  destination: './/uploads',
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname.slice(0, -4) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

// Env config
dotenv.config();

// Middleware
app.use(express.json({ extended: false }));

// Connect database
connectDB();

// Home route
// app.get('/', (req, res) => res.send('Hello World!'));

// Use Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

// serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
