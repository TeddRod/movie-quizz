// dependencies :
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const logger = require('morgan');

// middlewares :
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials : true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extented: false}));
app.use(express.static(path.join(__dirname, 'public')));

// routes :
app.use('/', require('./routes/index.js'));

// server :
app.listen(8080, () => {
  console.log('Server activated on port 8080...');
});

module.exports = app;