const express = require("express");
const auth = require("../middleware/auth");
const fs = require("fs");
const router = express.Router();

router.get(":fileId", auth, (req, res) => {
  const fileId = req.params.fileId;
  const filePath = `./uploads/${fileId}`; // Adjust the path as needed

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

router.delete(":fileId", auth, (req, res) => {
  const fileId = req.params.fileId;
  const filePath = `./uploads/${fileId}`; // Adjust the path as needed

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Error deleting file");
    } else {
      res.status(200).send("File deleted successfully");
    }
  });
});

module.exports = router;