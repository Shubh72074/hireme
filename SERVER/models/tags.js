const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  _id: String,
  results: Array,
});

const Tags = mongoose.model('tags', tagsSchema)

module.exports = Tags;