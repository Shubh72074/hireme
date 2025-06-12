const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    salary: {
        type: [Number],
        required: true
    },
    applyBy: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    company_logo: String,
    job_type: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        default: 'full-time'
    },
    category: {
        type: String,
        required: true
    },
    req_skills: [String] || [],
    req_exp: {type: Number, required: true},
    applicants: [{
      userid: {type: mongoose.SchemaTypes.ObjectId, ref: "user"},
      status: {type: String, enum: ["applied", "interviewed", "hired", "rejected"]},
      appliedAt: {type: Date, default: Date.now},
      resume: {type: String || null},
    }],
    publisher: {type: mongoose.SchemaTypes.ObjectId, ref:"employer"}
}, { timestamps: true });

const Jobs = mongoose.model('jobs', jobsSchema)

module.exports = Jobs;