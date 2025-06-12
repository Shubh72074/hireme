const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { userRole, userOrAdminRole } = require("../middleware/roleAuth");
const auth = require("../middleware/auth");
const Users = require("../models/users");
const Jobs = require('../models/job');
const mongoose = require("mongoose");


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

router.get("", auth, userRole, (req, res) => {
  // This route is used to get the user data by id

  console.log(`got request from ${req.headers.origin}`);
  console.log(`userID: ${req.user.id}`);

  // Find the user in the database using the user id
  Users.findOne({ _id: new mongoose.Types.ObjectId(req.user.id) }).then(data => {
    return res.json(data);
  }).catch(err => { console.log(err); });

});



router.post("/register", upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), async (req, res) => {
  console.log(`got request from ${req.headers.origin}`);

  const { email, password } = req.body;

  const resumeFile = req.files?.resume?.[0];
  const profilePicFile = req.files?.profilePic?.[0];

  const resumeFilePath = resumeFile ? resumeFile.destination + '/' + resumeFile.filename : null;
  const profilePicPath = profilePicFile ? profilePicFile.destination + '/' + profilePicFile.filename : null;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await Users.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    if (resumeFile) {
      const _resume = {
        name: resumeFile.originalname,
        resumeUrl: resumeFilePath,
      };
      user.resume.push(_resume);
    }

    if (profilePicFile) {
      user.profilePic = profilePicPath;
    }

    user.token = token;
    await user.save();

    return res.status(201).json({ message: "User created successfully", token: token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.get("/apply", auth, userRole, (req, res) => {
  const { jobid } = req.query;

  if (jobid) {


    Users.findOne({_id: new mongoose.Types.ObjectId(req.user.id)}).then(user => {
      Jobs.findOne({_id: new mongoose.Types.ObjectId(jobid)}).then(job => {
        const alreadyApplied = job.applicants.some(applicant => applicant.userid.toString() === req.user.id);
        console.log(`already: ${alreadyApplied}`)
        if (alreadyApplied) {
          return res.status(400).json({ message: "You have already applied for this job!" });
        }
        user.appliedJobs.push(new mongoose.Types.ObjectId(jobid));
        job.applicants.push({
          userid: new mongoose.Types.ObjectId(req.user.id),
          status: "applied",
          appliedAt: new Date(),
          resume: user.resume[0].toString()
        })
        user.save();
        job.save();

        return res.status(200).json({message: "Application Submitted Successfully"});
      })
    })
  } 
})

router.post("/login", upload.none(), async (req, res) => {
  console.log(`got login request from ${req.headers.origin}`);

  const { email, password } = req.body;

  const user = await Users.findOne({email: email});

  if (user === null) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    
    const token = jwt.sign({ id: user._id, role: "user" }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    
    user.token = token;
    
    user.save().then(() => {
      return res.status(200).json({ message: "User logged in successfully", token: token });
    }).catch(err => { console.log(err); });

  }
  return;
})

router.put("/:id", auth, userOrAdminRole, (req, res) => {
  console.log(`got request from ${req.headers.origin}`);
  const uid = parseInt(req.params.id);
  Users.findOneAndUpdate({ id: uid }, req.body, { new: true }).then(data => {
    return res.json(data);
  }).catch(err => { console.log(err); });
})

router.delete("/:id", auth, userOrAdminRole, (req, res) => {
  console.log(`got request from ${req.headers.origin}`);
  const uid = parseInt(req.params.id);
  Users.findOneAndDelete({ id: uid }).then(data => {
    return res.json(data);
  }).catch(err => { console.log(err); });
})

router.get("/applied-jobs", auth, userRole, (req, res) => {
  console.log(`got request from ${req.headers.origin}`);
  Users.findOne({_id: new mongoose.Types.ObjectId(req.user.id)}).select('applied-jobs').then(data => {
    return res.json(data);
  }).catch(err => console.log(err));
})



module.exports = router;