const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

router.get("/:userid/:recipientid", (req, res) => {
  const { userid, recipientid } = req.params;
  console.log(`user: ${userid} receipent: ${recipientid}`)
  Chat.find({
    $or: [
      { senderId: userid, receiverId: recipientid },
      { senderId: recipientid, receiverId: userid },
    ],
  })
    .sort({ createdAt: 1 })
    .then((chats) => {
      return res.json(chats);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;