// API ROUTES
var express = require('express'); 
var Quiz    = require('../models/quiz'); 
var assert  = require('assert'); 
var _       = require('lodash'); 
var RequestValidator = require('../utils/request-validator');

//  
const AssertionError = assert.AssertionError; 
var router  = express.Router();

// Middleware check data
router.use(/^\/quiz\/?(.*)\/?(?=\/|$)/i, (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {  
        RequestValidator
            .createAndUpdateQuiz(req)
            .then(_ => next())
            .catch((error) => {
                next(error); 
            }); 
        
        return ; 
    } 
    next(); 
});


// Create Ressource 
router.post('/quiz', (req, res, next) => {

    const newQuiz = new Quiz ({
        question: req.body.question,
        category: [...req.body.categories],
        response_index: req.body.response,
        responses: [...req.body.responses],
    }); 

    newQuiz.save((error) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Sorry! something goes wrong'
            });
        }
    }); 

    res.send({
        code: 201,
        message: "The quiz created successfully!"
    });
}); 

// Get all the quizzes
router.get('/quiz', (req, res, next) => {
    Quiz.find({}, (error, quizzes) => {
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Sorry! something goes wrong'
            });
        }
        res.send({
            data: quizzes
        }); 
    })
    .select({
        question: 1,
        responses: 1,
        category: 1,
        _id: 0,
    }) ; 
});

//  Get a particular quiz
router.get('/quiz/:id', (req, res) => {

    Quiz.findById(req.params.id,  (error, quiz) => {
        // If Error from database request
        if (error) {
            return res.status(500).send({
                error: true,
                message: 'Sorry! something goes wrong'
            });
        }

        return res.json({
            data: [
                quiz,
            ]
        }); 
    }).select({
        question: 1,
        responses: 1,
        category: 1,
        _id: 0,
    }); 
});

// Update a quiz
router.put('/quiz/:id', (req, res) => {
    Quiz.findOneAndUpdate(req.params.id, {
        question: req.body.question,
        category: [...req.body.categories],
        response_index: req.body.response,
        responses: [...req.body.responses],
    }, {}, function (error, quiz) {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Sorry! something goes wrong'
            });

            return ; 
        }

        res.send({
            code: 200,
            message: "The quiz is successfully updated!"
        });
    }); 
}); 

// Error on the request
router.use((err, req, res, next) => {
    res.status(403).send({
        error: true,
        message: err.message,
    }); 
});
 


module.exports = router; 
