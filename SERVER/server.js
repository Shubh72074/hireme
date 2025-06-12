const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const Message = require("./models/chat");
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

const onlineUsers = new Map();

wss.on('connection', (ws) => {
  console.log('User connected');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    if (data.type === 'register') {
      
      onlineUsers.set(data.userId, ws);
      console.log(`User ${data.userId} registered`);

      
      const undeliveredMessages = await Message.find({
        receiverId: data.userId,
        delivered: false,
      });

      undeliveredMessages.forEach((msg) => {
        ws.send(JSON.stringify({ type: 'message', payload: msg }));
        msg.delivered = true;
        msg.save();
      });
    } else if (data.type === 'message') {
      
      const newMessage = new Message({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
      });
      await newMessage.save();

      
      const receiverSocket = onlineUsers.get(data.receiverId);
      if (receiverSocket) {
        receiverSocket.send(JSON.stringify({ type: 'message', payload: newMessage }));
        newMessage.delivered = true;
        await newMessage.save();
      }
    }
  });

  ws.on('close', () => {
    console.log('User disconnected');
    for (const [userId, socket] of onlineUsers) {
      if (socket === ws) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });

});
  


server.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});