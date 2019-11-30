const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const app = express();
const mailer = require('nodemailer');

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
app.get('/', (req, res) => res.send('Hello World!'));

// Use Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
