import { useState } from "react";
import "./dashboard.css";
import { HiChevronRight, HiChevronLeft, HiDocumentText } from "react-icons/hi";
import {RxDashboard} from 'react-icons/rx';
import {MdOutlineWork,MdOutlineLogout,MdAnalytics} from 'react-icons/md';
const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    document.querySelector(".sidebar").classList.toggle("open");
    toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="toggle">
          {toggle ? (
            <HiChevronRight size={"26px"} onClick={handleToggle} />
          ) : (
            <HiChevronLeft size={"26px"} onClick={handleToggle} />
          )}
        </div>
        <div className="icon">
          <div>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="4" fill="white" />
              <path
                d="M15.8571 17.3077L18.3484 14.259C18.7051 13.8224 18.6306 13.1774 18.1837 12.8336L9.60971 6.23824C8.95209 5.73238 8 6.20119 8 7.03086V22.6215C8 23.5073 9.06661 23.9558 9.69957 23.3361L11.9286 21.1538"
                stroke="#FF5050"
                stroke-width="2"
              />
              <path
                d="M18.1538 9.14286L20.1992 6.40795C20.7751 5.6378 22 6.04515 22 7.00686V25.3885C22 26.3057 20.8684 26.739 20.2558 26.0564L12.5994 17.5251C12.2584 17.1451 12.2584 16.5692 12.5994 16.1892L14.3077 14.2857"
                stroke="#FF8989"
                stroke-width="3"
              />
            </svg>
          </div>
          <a href="https://www.google.co.in">Shubh@gmail.com</a>
        </div>
        <hr />
        <div className="nav-menu">
          <a href="dashboard"><RxDashboard size={"18px"}/></a>
          <a href="analytics"><MdAnalytics size={"18px"}/></a>
          <a href="applications"><HiDocumentText size={"18px"}/></a>
          <a href="post-jobs"><MdOutlineWork size={"18px"}/></a>
        </div>
        <button><MdOutlineLogout size={"18px"}/></button>
      </div>
      <div className="dashboard-header">Dashboard</div>
    </div>
  );
};

export default Dashboard;
