const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  categories: Array,
  question: String,
  description: String,
  responses: Array,
  correct_response: Number
});

module.exports = mongoose.model('quiz', QuizSchema);
