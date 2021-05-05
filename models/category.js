const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  label: String
});

module.exports = new mongoose.model('category', CategorySchema);