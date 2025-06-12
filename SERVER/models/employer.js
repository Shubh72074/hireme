const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String || null,
  },
  companyDescription: {
    type: String || null,
  },
  companyLogoUrl: {
    type: String || null,
  },
  companyWebsite: {
    type: String || null,
  },
  token: {
    type: String,
  },
  location: {
    type: String || null,
  },
  phone: {
    type: String || null,
  },
  socialLinks: {
    github: String || null,
    linkedin: String || null,
    website: String || null,
    twitter: String || null,
  },
  type: {
    type: String,
    enum: ['individual', 'organization'],
    required: true
  },
  jobs: [{type: mongoose.SchemaTypes.ObjectId, ref: "jobs"}],
  role: {
    type: String,
    enum: ['user', 'employer', 'admin'],
    default: 'employer'
  }

}, { timestamps: true });

module.exports = mongoose.model("employer", employerSchema);