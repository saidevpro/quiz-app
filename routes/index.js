var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  return res.send('Hello! Welcome to my quiz app');
});

module.exports = router;
