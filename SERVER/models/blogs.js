const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  content: String,
  posted: Date
});

const Blogs = mongoose.model('blogs', blogsSchema)

module.exports = Blogs;