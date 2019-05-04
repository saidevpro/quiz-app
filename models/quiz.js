const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: String,
  category: Array,
  response_index: Number,
  responses: Array
});

module.exports = mongoose.model('quiz', QuizSchema);
