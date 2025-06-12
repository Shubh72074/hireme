const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth');
const Jobs = require('../models/job');
const { employerRole, employerOrAdminRole } = require('../middleware/roleAuth');
const Users = require('../models/users');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get('/:id', auth, (req, res) => {
  Jobs.findById(new mongoose.Types.ObjectId(req.params.id)).then(data => {
    return res.json(data);
  }).catch(err => console.log(err));
})

router.get("/", (req, res) => {
  console.log(`job request`);
  const { q, e, l} = req.query;
  const query = {};
  if (q) {
    query.title = { $regex: q, $options: 'i'}
  }
  if (e) {
    query.req_exp = { $lte: parseInt(e) }; // Experience required is less than or equal to
  }
  if (l) {
    query.location = { $regex: l, $options: 'i' }; // Case-insensitive title search
  }

  Jobs.find(query).then(data => {
    return res.json(data);
  }).catch(err => console.log(err));

})

router.post("/", auth, upload.none(), employerRole, (req, res) => {
  Jobs.create(req.body).then(job => {
    job.save();
    return res.status(200).json({message: "Job Created Successfully"});
  }).catch(err => console.log(err));
})

router.delete('/:id', auth, employerOrAdminRole, (req, res) => {
  Jobs.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id)).then(()=> {
    return res.status(200).json({message: "Job deleted successfully"});
  }).catch(err => console.log(err));
})

router.get("/applied", auth, (req, res) => {
  Users.findOne({_id: new mongoose.Types.ObjectId(req.user.id)}).then(user => {
    const jobids = user.appliedJobs;
    console.log(jobids);
    Jobs.find({_id: { $in: jobids}}).then(jobs => {
      return res.status(200).json(jobs);
    }).catch(err => { return res.status(400).json({message: "No job found"})});
  }).catch(err => console.log(err));
})

module.exports = router;