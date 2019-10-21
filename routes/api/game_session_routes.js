const express = require('express');
const Quiz = require('../../models/quiz');

const Router = express.Router();

// Get a specifiq language question by avoiding some question specify in query ids params
Router.get('/game/question', (req, res, next) => {
  Quiz.findOne(
    {
      categories: { $in: Array.isArray(req.query.plang) ? req.query.plang : [req.query.plang] },
      _id: { $nin: Array.isArray(req.query.ids) ? req.query.ids : [req.query.ids] }
    },
    (error, question) => {
      if (error) return next(error);

      res.send({
        language: req.query.plang,
        question
      });
    }
  ).select({
    question: 1,
    responses: 1,
    categories: 1,
    body: 1,
    _id: 1
  });
});

// Get a question true response
Router.get('/game/response', (req, res, next) => {
  Quiz.findOne(
    {
      _id: req.query.id
    },
    (error, question) => {
      if (error) return next(error);

      res.send({
        question
      });
    }
  ).select({
    _id: 1,
    question: 1,
    response_description: 1,
    correct_response: 1
  });
});

// Get a game session statistics from a programming language
Router.get('/plang/stats', (req, res, next) => {
  Quiz.count(
    {
      categories: {
        $in: Array.isArray(req.query.plang) ? req.query.plang : [req.query.plang]
      }
    },
    (error, count) => {
      if (error) {
        return next(error);
      }

      res.send({
        language: req.query.plang,
        count
      });
    }
  );
});

module.exports = Router;
