const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  _id: String,
  total: Number,
});

const Categories = mongoose.model('categories', categoriesSchema)

module.exports = Categories;