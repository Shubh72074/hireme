import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
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
import Dashboard from "./udashboard";
import Jobs from "./ujobs";
import AppliedJobs from "./uappliedjobs";
import Messages from "./umessages";

const UserDashboard = () => {
  const { fetchUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      if (!!sessionStorage.getItem("token")) {
        const data = await fetchUser(sessionStorage.getItem("token"));
        data ? setUser(data) : navigate("/login");
      } else {
        navigate("/");
      }
    };
    getUser();
  }, [navigate, fetchUser]);
  return (
    <>
      <div className="user_header">
        <div className="logo" id="logo">
          <span>
            <svg
              width="21"
              height="32"
              viewBox="0 0 21 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1429 19.4615L18.3172 14.5034C18.6877 14.0633 18.6114 13.4022 18.1504 13.058L3.59826 2.19327C2.93875 1.70088 2 2.17153 2 2.99457V28.6703C2 29.549 3.05188 30.0005 3.68884 29.3952L8.07143 25.2308"
                stroke="#FF8989"
                strokeWidth="3"
              />
            </svg>
          </span>
          <span>
            <svg
              width="23"
              height="40"
              viewBox="0 0 23 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4615 9.71429L18.2371 4.07987C18.8392 3.36954 20 3.79529 20 4.72644V35.6144C20 36.5013 18.9313 36.9492 18.2989 36.3275L3.72526 21.9988C3.32672 21.6069 3.32672 20.9645 3.72526 20.5726L6.92308 17.4286"
                stroke="#FF5050"
                strokeWidth="6"
              />
            </svg>
          </span>
          <span>
            <svg
              width="95"
              height="26"
              viewBox="0 0 95 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2836 26H0.0570297V22.3672H4.08047V4.16406H0.0570297V0.511719H12.2836V4.16406H8.12344V22.3672H12.2836V26ZM35.6008 26H30.4836L23.882 15.6875H22.0461V26H18.0031V0.511719H26.4016C29.201 0.511719 31.3755 1.15625 32.925 2.44531C34.4745 3.72135 35.2492 5.61589 35.2492 8.12891C35.2492 9.2487 35.0734 10.2383 34.7219 11.0977C34.3833 11.944 33.8951 12.6732 33.257 13.2852C32.632 13.8971 31.8964 14.3854 31.05 14.75C30.2167 15.1016 29.3117 15.3424 28.3352 15.4727L35.6008 26ZM31.2062 8.07031C31.2062 6.76823 30.7766 5.79167 29.9172 5.14062C29.0708 4.48958 27.899 4.16406 26.4016 4.16406H22.0461V12.0352H26.4016C27.899 12.0352 29.0708 11.7096 29.9172 11.0586C30.7766 10.4076 31.2062 9.41146 31.2062 8.07031ZM54.3281 26H38.0391V0.511719H54.3281V4.16406H42.082V11.1953H51.6328V14.8477H42.082V22.3672H54.3281V26ZM74.3641 26H70.3211V8.75391L67.7625 17.9141H64.6375L62.118 8.75391V26H58.075V0.511719H62.8797L66.2 12.0352L69.5203 0.511719H74.3641V26ZM94.4 26H78.1109V0.511719H94.4V4.16406H82.1539V11.1953H91.7047V14.8477H82.1539V22.3672H94.4V26Z"
                fill="#810000"
              />
            </svg>
          </span>
        </div>
        <div
          className="user_dropMenuBtn"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <img src={user.profilePic || `https://robohash.org/${user.name}`} alt="user_profile" />
          <p>{user && user.name}</p>
          {showMenu ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showMenu && (
          <div className="user_dropMenu">
            <NavLink to={"profile"}>
              <BiUser size={"20px"} />
              Edit Resume
            </NavLink>
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
            <button>Edit Resume</button>
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
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="messages" element={<Messages />} />
          </Routes>
        </div>
        <div className="user_notice"></div>
      </div>
    </>
  );
};

export default UserDashboard;
