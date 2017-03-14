const express = require('express');
const { api } = require('../controllers');

module.exports = app => {
  const router = express.Router();
  app.use('/api', router);

  router.get('/users/:user', (req, res) => {
    api.getUser(req, res);
  });
};
