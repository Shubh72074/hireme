require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const crypt = require('bcryptjs')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/users');
const Jobs = require('./models/jobs')
const auth = require("./middleware/auth");
const Categories = require("./models/categories");
const Blogs = require('./models/blogs');
const Tags = require('./models/tags');
// const logger = require('console');
// const fs = require('fs');
// const mysql = require('mysql');
// mysql.createConnection('localhost:')

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(cors(['127.0.0.1','102.168.1.108']));


app.get('/jobs', (req,res) => {
  console.log(`got jobs request from ${req.headers.origin} | ${Date.now()}`);
  Jobs.find().then(data => {
    res.json(data);
  }).catch(err => { console.log(err); });

});

app.get('/jobs/:filter', (req,res) => {
  console.log(`got jobs request from ${req.headers.origin} | ${Date.now()}`);
  const category = req.params.filter;
  console.log(category);

  Jobs.find({category: category}).then(data => {
    res.json(data);
  }).catch(err => { console.log(err); });

});

app.get('/jobss/:filter', (req,res) => {
  console.log(`got jobs request from ${req.headers.origin} | ${Date.now()}`);
  const category = req.params.filter;
  console.log(category);

  Jobs.find({job_type: category}).then(data => {
    res.json(data);
  }).catch(err => { console.log(err); });

});

app.get('/job/:id', (req,res) => {
  console.log(`got request from ${req.headers.origin}`);
  console.log(`jobid: ${req.params.id}`);
  const jid = parseInt(req.params.id);
  Jobs.findOne({id:jid}).then(data => {
    res.json(data);
  }).catch(err => { console.log(err); });

});

app.get('/categories', (req,res) => {
  console.log(`got category request from ${req.headers.origin} | ${new Date().toLocaleString()}`);
  Categories.find().then(data => {
    res.json(data);
  }).catch(err => console.log(err));
});

app.get('/blogs/:id', (req,res) => {
  console.log(`got blogs request from ${req.headers.origin}`);
  const id = parseInt(req.params.id);
  Blogs.find({id:id}).then(data => {
    res.json(data);
  }).catch(err => console.log(err));
});


app.post('/user',auth, (req,res) => {
  User.findOne({email:req.user.email}).then(data => {
    res.json({
      name : data.name,
      email : data.email,
      profilePic : data.profilePic,
    });
  }).catch(err => console.log(err));
})

app.post("/register", async (req, res) => {
  
  try {
    // Get user input
    const { name, email, password, profilePic } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await crypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      profilePic: profilePic,
      password: encryptedPassword,
      token : ''
    });

    const token = jwt.sign(
      { user_id: user._id.toString(), email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    user.save();
    // return new user
    res.status(201).json(user);
  } catch (err) {
    // console.log(err);
    res.json(err);
  }
  // Our register logic ends here
});

app.get('/tags/:category',(req,res) => {
  console.log(req.params.category);
  Jobs.aggregate([{$match:{category:`${req.params.category}`}},{$project:{_id:0,tags:1}}]).then(data=>{
        let fData = new Set();
        data.map((val,idx)=>(
          val.tags.forEach(element => {
            fData.add(element)
          })
        ))
        const tags = [...fData]
        res.json(tags);
  }).catch(err=>console.log(err));
})

app.get('/searchByTag/:tag',(req,res)=>{
  console.log(req.params.tag);
  const _tag = req.params.tag;
  let cat = "";
  Tags.aggregate([{$project:{_id:1,results:1}}]).then(data=>{
    data.map((val)=>(
      val.results.forEach(tag=>{
        tag.forEach(t=>{
          if (t === _tag) {
            cat = val._id;
          }
        })
      })
    ))
    res.json({category:cat});
  }).catch(err=>console.log(err));
})

app.get('/tags',(req,res) => {
  Tags.aggregate([{$project:{_id:0,results:1}}]).then(data=>{
    let dataSet = new Set();
    
    data.map((val)=>(
      val.results.forEach(tag=>{
        tag.forEach(t=>{
          dataSet.add(t);
        })
      })
    ))
    const tags = [...dataSet];
    res.json(tags);
  }).catch(err=>console.log(err));
})
  

app.post("/login", async (req, res) => {

  try {
    // Get user input
    const  email  = req.body.email;
    const password = req.body.password;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await crypt.compare(password, user.password))) {
      // Create token
      const token =  jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;


      res.status(200).json(user);
    }
    else {

      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }

});

module.exports = app;