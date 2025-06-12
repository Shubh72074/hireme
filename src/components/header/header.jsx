import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../../context/authUser";
import {BiEdit} from 'react-icons/bi';
import {MdAlternateEmail} from 'react-icons/md';
import Logo from "../../utils/logo";
import axios from "axios";

const Header = () => {
  const { token, logout, role } = useAuth();
  const [profile, setProfile] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const load = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/${role}?token=${token}`).then(user => setProfile(user.data)).catch(
        err => {
          console.log(err);
        }
      )
    }
    if (token !== null) load();
  },[token, role]);

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <nav className="header">
        <Logo/>
        <div className="nav-items">
          <Link to={"/jobs"}>Jobs</Link>
          <Link to={"/resume"}>Build Resume</Link>
          <Link style={{position: 'relative'}} to={"/"}>KodePlay <span style={{position: 'absolute', fontSize: '8px', width: 'max-content', right: '0', top: '-14px', backgroundColor: 'rgb(215, 234, 200)', padding: '1px 2px'}}>Coming Soon</span></Link>
        </div>
        {profile != null ? <div className="profileMenuDiv">
            <button
              className="user-profile">
                <img onClick={
                  (e)=>{
                    e.preventDefault();
                    const dropprofile = document.getElementById("drop-profile");
                    dropprofile.classList.toggle('show');
                  }
              }
                src={`${process.env.REACT_APP_API_URL}/${profile.profilePic}` || `https://robohash.org/${profile.name}`} alt="profile" width={'38px'} height={'38px'} loading="lazy"/>
            </button>
            <div className="drop-profile" id="drop-profile">
              <Link to={'/user'}><p id="name">{profile.name} <BiEdit/></p></Link>
              <p id="email"><MdAlternateEmail/>{profile.email}</p>
              <hr />
              <div id="_lbtn"><button onClick={(e) => {e.preventDefault(); logout();}}>Sign Out</button></div>
            </div>
        </div>
      
        :
         <div>
          <div className="desk-header">
            <div onClick={()=> nav('/user/login')}>
              <Link
                to={"/user/login"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "300",
                  width: "fit-content",
                }}
                >
                Login / Register
              </Link>
            </div>
      
            <div onClick={()=>nav('/employer/login')}>
              <Link
                to={"/employer/login"}
                style={{ textDecoration: "none", color: "inherit" }}
                >
                POST JOBS
              </Link>
            </div>
          </div>
          <div className="mob-menu-btn" onClick={(e)=> {
            e.preventDefault();
            const mobMenu = document.getElementById("mob-menu");
            mobMenu.classList.toggle('visible');
          }}>
            <button>
              <AiOutlineMenu color="white" size={"18px"} />
            </button>
          </div>
          <div className="mob-menu" id="mob-menu">
            <button onClick={(e)=> {
              e.preventDefault();
              const mobMenu = document.getElementById("mob-menu");
              mobMenu.classList.toggle('visible');
            }}>
              <AiOutlineCloseCircle color="#990011" size={"36px"} />
            </button>
            <div>
              <button style={{width: "fit-content"}} onClick={()=> nav('/user/login')}>
                Login
              </button>
              <button onClick={()=> nav('/user/register')}>
                Register
              </button>
            </div>
            <button onClick={()=>nav('/employer')}>
              Post Job
            </button>
          </div>
        </div>}
      </nav>
    </div>
  );
};

export default Header;
