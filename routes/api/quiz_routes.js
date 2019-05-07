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
Router.post('/quiz', (req, res, next) => {
  const newQuiz = new Quiz({
    categories: [...req.body.categories],
    question: req.body.question,
    description: req.body.description,
    responses: [...req.body.responses],
    correct_response: req.body.correct_response
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
  const contraints = {};

  if (req.query.c) {
    const categories = req.query.c;

    contraints['categories'] = {
      $in: Array.isArray(categories) ? categories : [categories]
    };
  }

  Quiz.find(contraints, (error, quizzes) => {
    if (error) {
      return res.status(500).send({
        error: true,
        message: 'Sorry! something goes wrong'
      });
    }
    res.send(quizzes);
  })
    .select({
      question: 1,
      responses: 1,
      categories: 1,
      description: 1,
      _id: 1
    })
    .sort({
      _id: -1
    });
});

//  Delete a particular quiz
Router.delete('/quiz', (req, res) => {
  Quiz.deleteOne({ _id: req.body.id }, error => {
    if (error) {
      return res.status(500).send({
        error: true,
        message: 'Sorry! something goes wrong'
      });
    }
  });
  return res.status(200).send({ message: 'The item is deleted.' });
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

    return res.json(quiz);
  }).select({
    question: 1,
    responses: 1,
    categories: 1,
    description: 1,
    correct_response: 1
  });
});

// Update a quiz
Router.put('/quiz/:id', (req, res) => {
  Quiz.findOneAndUpdate(
    req.params.id,
    {
      categories: [...req.body.categories],
      question: req.body.question,
      description: req.body.description,
      responses: [...req.body.responses],
      correct_response: req.body.correct_response
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

      res.send(quiz);
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
