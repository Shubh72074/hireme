import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/authUser'

function Message() {
  const { token, role } = useAuth();
  const [chats, setChats] = useState([{
    name: "Shubham",
    recieverId: '680fe843fd37c7227ec8fcdf',
    profilePic: 'uploads/profilePic-1745861561160-416913748.jpeg',
  }, {
    name: "Saurav",
    recieverId: '680ceeb73399f81fcd3ab659',
    profilePic: 'uploads/profilePic-1745861561160-416913748.jpeg',
  }, {
    name: "Sagar",
    recieverId: '64a1597a42abb7802641eee6',
    profilePic: 'uploads/profilePic-1745861561160-416913748.jpeg',
  }]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/${role}/chats?token=${token}`).then(chats => {
      setChats(chats);
    }).catch(err => console.log(err));
  },[token, role])

  return (
    <div style={{display: 'flex'}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "600px"}}>
        {
          chats.map((chat, idx) => (
            <Link style={{display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%"}} to={`chat?reciever=${chat.recieverId}`} key={idx}>
              <img style={{width: "40px", height: "40px", border: "1px solid rgb(230, 240, 244)", borderRadius: "50%", padding: "4px"}} src={`${process.env.REACT_APP_API_URL}/${chat.profilePic}`} alt="profile" />
              <p>{chat.name}</p>
            </Link>
          ))
        }
      </div>
      <Outlet/>
    </div>
  )
}

export default Message