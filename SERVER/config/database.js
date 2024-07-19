const mongoose = require("mongoose");

const { MONGO_URI_LOCAL } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "hireme"
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};