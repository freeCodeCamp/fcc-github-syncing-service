const express = require('express');
const app = express();

const githubWebhookApi = require('./lib/github-webhook-api');

const {
  HOST,
  PORT,
  SECRET
} = process.env;

const webhook = githubWebhookApi({
  secret: process.env.SECRET
});

app.post('/webhook', webhook, (req, res) => {
  console.log('Received request');
});

app.listen(PORT || 8080, HOST || 'localhost', () => {
  const displayMessage = `
  ############################
  #   Microservice started   #
  ############################
  `;
  console.log(displayMessage);
});
