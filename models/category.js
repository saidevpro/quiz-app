var mongoose = require('mongoose'); 


var CategorySchema = new mongoose.Schema({
    label: String,
}); 

module.exports = new mongoose.model('category', CategorySchema); 


