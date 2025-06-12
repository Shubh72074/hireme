require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoute');
const chatRoutes = require('./routes/chatRoutes');
const jobRoutes = require('./routes/jobRoutes')
const employerRoutes = require('./routes/employerRoutes');
const Jobs = require("./models/job");

const app = express();
app.use(express.json({limit: '10mb'}));
app.use(cors(['127.0.0.1:3000', 'http://localhost:3000']));
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/employer", employerRoutes)
app.use("/file", fileRoutes);
app.use("/chat", chatRoutes);
app.use("/job", jobRoutes);

app.get("/locations", (req, res) => {
  Jobs.distinct("candidate_required_location", {
    candidate_required_location: {$exists: true, $ne: null}
  }).then(data => res.status(200).json(data)).catch(err => console.log(err));
})

module.exports = app;