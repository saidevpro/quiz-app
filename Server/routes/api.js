// API ROUTES
var express = require('express'); 
var router = express.Router();


router.get('/quiz', (req, res, next) => {
    res.send({message: "quiz requesting"}); 
});

module.exports = router; 
