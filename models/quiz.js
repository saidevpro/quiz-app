const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  categories: Array,
  question: String,
  body: String,
  response_description: String,
  responses: Array,
  correct_response: String
});

module.exports = mongoose.model('quiz', QuizSchema);
