import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import {
  FaBriefcase,
  FaChartPie,
  FaChevronDown,
  FaSuitcase,
  FaChevronUp,
} from "react-icons/fa";
import "./user.css";
import { useAuth } from "../../context/authUser";
import { FaMessage } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import Logo from "../../utils/logo";
import axios from "axios";

const UserDashboard = () => {
  const { logout, token, role } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) navigate("/user/login", {
      replace: true,
    });
    axios.get(`${process.env.REACT_APP_API_URL}/${role}?token=${token}`).then(user => setUser(user.data)).catch(
      err => {
        console.log(err);
      }
    )
  }, [token, role, navigate]);
  return (
    <>
      <div className="user_header">
        <Logo/>
        <div
          className="user_dropMenuBtn"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <img src={`${process.env.REACT_APP_API_URL}/${user.profilePic}` || `https://robohash.org/${user.name}`} alt="user_profile" />
          <p>{user && user.name}</p>
          {showMenu ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showMenu && (
          <div className="user_dropMenu">
            <Link to={"http://localhost:3001/"}>
              <BiUser size={"20px"} />
              Edit Resume
            </Link>
            <NavLink to={"settings"}>
              <BsGear size={"20px"} />
              Account Settings
            </NavLink>
            <div></div>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <MdLogout size={"20px"} />
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="user_main">
        <div className="user_nav">
          <div className="postJob_btn">
            <button onClick={()=>{window.open("http://localhost:3001/", '-blank')}}>Edit Resume</button>
          </div>
          <NavLink to={"dashboard"}>
            <FaChartPie size={"16px"} />
            Dashboard
          </NavLink>
          <NavLink to={"jobs"}>
            <FaSuitcase size={"16px"} />
            New Jobs
          </NavLink>
          <NavLink to={"applied-jobs"}>
            <FaBriefcase size={"16px"} />
            Applied Jobs
          </NavLink>
          <NavLink to={"messages"}>
            <FaMessage size={"16px"} />
            Messages
          </NavLink>
        </div>
        <div className="user_content">
          <Outlet/>
        </div>
        <div className="user_notice"></div>
      </div>
    </>
  );
};

export default UserDashboard;
