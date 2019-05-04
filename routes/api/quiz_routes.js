// API ROUTES
const express = require('express');
const _ = require('lodash');
const Quiz = require('../../models/quiz');
const RequestValidator = require('../../utils/request-validator');

const Router = express.Router();

// Middleware check data
Router.use(/^\/quiz\/?(.*)\/?(?=\/|$)/i, (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    RequestValidator.createAndUpdateQuiz(req)
      .then(_ => next())
      .catch(error => {
        next(error);
      });
    return;
  }
  next();
});

// Create Ressource
Router.post('/quizzes', (req, res, next) => {
  const newQuiz = new Quiz({
    question: req.body.question,
    category: [...req.body.categories],
    correct_response: req.body.response,
    responses: [...req.body.responses]
  });

  newQuiz.save(error => {
    if (error) {
      res.status(500).send({
        error: true,
        message: 'Sorry! something goes wrong'
      });
    }
  });

  res.send({
    code: 201,
    message: 'The quiz created successfully!'
  });
});

// Get all the quizzes
Router.get('/quiz', (req, res, next) => {
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
  }).select({
    question: 1,
    responses: 1,
    category: 1,
    _id: 0
  });
});

//  Get a particular quiz
Router.get('/quiz/:id', (req, res) => {
  Quiz.findById(req.params.id, (error, quiz) => {
    // If Error from database request
    if (error) {
      return res.status(500).send({
        error: true,
        message: 'Sorry! something goes wrong'
      });
    }

    return res.json({
      data: [quiz]
    });
  }).select({
    question: 1,
    responses: 1,
    category: 1,
    _id: 0
  });
});

// Update a quiz
Router.put('/quiz/:id', (req, res) => {
  Quiz.findOneAndUpdate(
    req.params.id,
    {
      question: req.body.question,
      category: [...req.body.categories],
      correct_response: req.body.response,
      responses: [...req.body.responses]
    },
    {},
    function(error, quiz) {
      if (error) {
        res.status(500).send({
          error: true,
          message: 'Sorry! something goes wrong'
        });

        return;
      }

      res.send({
        code: 200,
        message: 'The quiz is successfully updated!'
      });
    }
  );
});

// Error on the request
Router.use((err, req, res, next) => {
  res.status(403).send({
    error: true,
    message: err.message
  });
});

module.exports = Router;
