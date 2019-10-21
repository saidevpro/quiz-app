const express = require('express');

const Router = express.Router();

Router.get('/categories', (req, res) => {
  return res.send(['javascript', 'php', 'dart', 'python', 'sql']);
});

module.exports = Router;
