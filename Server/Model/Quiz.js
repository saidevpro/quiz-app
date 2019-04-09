const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema ({
    question: String,
    // category: Array,
    // reponse_index: Number,
    // responses: Array
}); 


module.exports = mongoose.model('Quiz', QuizSchema); 
