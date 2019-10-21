const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  return res.send('Hello! Welcome to my quiz app');
});

module.exports = router;
