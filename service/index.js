require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const {
  HOST,
  PORT,
  MONGO_URI,
} = process.env;

// Connect to db
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Config express
const app = express();
app.use(bodyParser.json());
routes(app);

const port = PORT || 8080;
const host = HOST || 'localhost';
app.listen(port, host, () => {
  const displayMessage = `
  ############################
  #   Microservice started   #
  ############################
  # Host: ${host}
  # Port: ${port}
  ############################
  `;
  console.log(displayMessage);
});
