import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./chatbox.css";
import { useAuth } from "../../context/authUser";
import axios from "axios";
import { LuSend } from "react-icons/lu";
const jwt = require('jwt-decode');

const ChatBox = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { token, role } = useAuth();
  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const receiverId = query.get('reciever')
  const { id } = jwt.jwtDecode(token);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_SOCKET_URL);
    console.log(`mine: ${id} receiver: ${receiverId}`);
    socket.onopen = () => {
      console.log('Connected to server');
      setWs(socket);
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if ((data.type === 'message' && data.payload.senderId !== id) && data.payload.senderId === receiverId) {
        setMessages((prev) => [...prev, data.payload]);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
    };

    return () => {
      socket.close();
    };
  }, [id, receiverId]);

  useEffect(() => {
    
    scrollToBottom();
    axios.get(`${process.env.REACT_APP_API_URL}/chat/${id}/${receiverId}`).then((chats) => {
      setMessages(chats.data);
    }).catch((err) => {});
  }, [id, receiverId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const registerUser = () => {
  //   if (ws && id) {
      
  //   }
  // }

  const sendMessage = () => {
    const { id } = jwt.jwtDecode(token);
    if(ws) {
      ws.send(JSON.stringify({
        type: 'register',
        userId: id
      }))
    }
    const receiverId = params.reciever;
    if (ws && input && receiverId) {
      ws.send(
        JSON.stringify({
          type: 'message',
          senderId: id,
          receiverId,
          content: input,
        })
      );
      setMessages((prev) => [...prev, {
        senderId: id,
        receiverId,
        content: input,
        timestamp: new Date(),
      }]);
      setInput('');
    }
  };

  return (
    <div className='chat-box-wrapper'>
      <div className="chat-wrapper">
        {
          messages.map((chat, idx) => (
            chat.senderId === id ? <div key={idx} className="chat self"><p>{chat.content}</p></div> : 
            <div key={idx} className="chat other"><p>{chat.content}</p></div>
          ))
        }
      </div>
      <div className="chat-control-wrapper">
        <input type="text" name="message" id="message" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
        <button onClick={sendMessage}><LuSend size={16}/></button>
      </div>
    </div>
  );
}

export default ChatBox;