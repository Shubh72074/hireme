const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
  _id: String,
  id: Number,
  url: String,
  title: String,
  company_name: String,
  company_logo: String,
  category: String,
  tags: Array,
  job_type: String,
  publication_date: String,
  candidate_required_location: String,
  salary: String,
  description: String
});

const Jobs = mongoose.model('jobs', jobsSchema)

module.exports = Jobs;