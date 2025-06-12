const express = require("express");
const auth = require("../middleware/auth");
const { employerRole } = require("../middleware/roleAuth");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const Employer = require("../models/employer");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const multer = require('multer')
const path = require('path')

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

router.get("", auth, employerRole, (req, res) => {
  Employer.findById(new mongoose.Types.ObjectId(req.user.id)).then(data => {
    return res.status(200).json(data);
  }).catch(err => console.log(err));
})

router.get('/jobs', auth, employerRole, (req, res) => {
  Employer.findById(new mongoose.Types.ObjectId(req.user.id)).select('jobs').then((data) => {
    return res.status(200).json(data);
  })
})

router.get("/applicants", auth, employerRole, (req, res) => {

  const pipeline = [
    { $match: { _id: new mongoose.Types.ObjectId(req.user.id)} },
    { $lookup: {
        from: "users",
        localField: "jobs",
        foreignField: "appliedJobs",
        as: "users"
      }
    },
    { $project: { users: 1, _id: 0 } }
  ];

  Employer.aggregate(pipeline).then(data => res.status(200).json(data)).catch(err => console.log(err));

});

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  const emp = await Employer.findOne({email: email});

  if (emp === null) return res.status(400).json({message: "Email is not registered"});
  
  if (emp && (await bcrypt.compare(password, emp.password))) {
    const _token = jwt.sign({id: emp._id, role: emp.role}, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    emp.token = _token;

    emp.save().then(()=>{
      return res.status(200).json({message: `Welcome, ${emp.name}`, token: _token});
    }).catch(err => {console.log(err); return res.status(500).json({message: "Unable to process the request"})});
  }
  else {
    console.log(`bcrypt failed..`);
    return res.status(400).json({message: "Password error"})
  }
})

router.post("/register", upload.single('profilePic'), (req, res) => {
  console.log(`got request from ${req.headers.origin}`);
  
  const { email, password } = req.body;
  const picFilePath = req.file?.destination + '/' + req.file?.filename;


  Employer.findOne({ email: email }).then(data => {
    if (data) {
      return res.status(409).json({ message: "Email already exists" });
    } else {

      // Hash the password before saving it to the database
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create user in the database
      const employer = Employer.create({
        ...req.body,
        password: hashedPassword
      });

      const token = jwt.sign({ id: employer._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      

      employer.then((u) => { u.token = token; u.role="employer"; u.companyLogoUrl = picFilePath; u.save(); return res.status(201).json({ message: "User created successfully", token: token });
    }).catch(err => { console.log(err); });

    }

  }).catch(err => { console.log(err); });
})


module.exports = router;