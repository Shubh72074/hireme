import "./showJobs.css";
import {BsFillBuildingsFill} from 'react-icons/bs';
import {FaMoneyBillWave} from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight, HiLocationMarker} from 'react-icons/hi';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function ShowJobs() {
  const [data, setData] = useState([]);
  const [iter, setIter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`);
        const jsonData = await response.json();
        setData(jsonData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleNext = (e) => {
    e.preventDefault();
    iter < data.length-10 ? setIter(iter+10) : setIter(iter)
  }

  const handlePrev = (e) => {
    e.preventDefault();
    iter > 10 ? setIter(iter-10) : setIter(0)
  }
  return (
    <>
      <div className="jobs-container">
        {
          data.slice(iter,iter+10).map((job,idx) => (
          <Link key={idx} to={`/job/${job.id}`}>
            <div className="job-card">
            <img src={job.company_logo} alt="company-logo" width={38} height={38}/>
            <div className="job-info">
              <div className="job-title">
                {job.title}
              </div>
              <div className="l">
                <div className="company-name">
                  <span><BsFillBuildingsFill/></span>{" "}{job.company_name}
                </div>
                <div className="salary">
                  <span><FaMoneyBillWave/></span>{" "}{job.salary === ''? "NOT DEFINED" : job.salary}
                </div>
                <div className="location">
                  <span><HiLocationMarker/></span>{" "}{job.candidate_required_location}
                </div>
              </div>
            </div>
          </div>
          </Link>
          ))
        }
        <div className="nav-btns">
          <p>{`${iter+1} - ${iter + 10} of ${data.length}`}</p>
        <button onClick={handlePrev}><HiChevronLeft size={'28px'}/></button>
        <button onClick={handleNext}><HiChevronRight size={'28px'}/></button>
        </div>
      </div>
    </>
  );
}

export default ShowJobs;