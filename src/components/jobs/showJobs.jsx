import "./showJobs.css";
import {BsFillBuildingsFill} from 'react-icons/bs';
import {FaMoneyBillWave} from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight, HiLocationMarker} from 'react-icons/hi';
import React, { useState } from 'react';
import { Link } from "react-router-dom";


function ShowJobs(props) {
  const [iter, setIter] = useState(0);
  
  const handleNext = (e) => {
    e.preventDefault();
    iter < props.jobs.length-30 ? setIter(iter+30) : setIter(iter)
  }

  const handlePrev = (e) => {
    e.preventDefault();
    iter > 30 ? setIter(iter-30) : setIter(0)
  }
  if (props.jobs.length > 30 ) {
    return (
      <>
        <div className="jobs-container">
          {
            props.jobs.slice(iter,iter+30).map((job,idx) => (
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
                    <span><FaMoneyBillWave/></span>{" "}{job.salary === ''? "NOT DISCLOSED" : job.salary}
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
            <p>{`${iter+1} - ${iter + 30} of ${props.jobs.length}`}</p>
          <button onClick={handlePrev}><HiChevronLeft size={'28px'}/></button>
          <button onClick={handleNext}><HiChevronRight size={'28px'}/></button>
          </div>
        </div>
      </>
    );
  }
  else
  {
    return (
        <div className="jobs-container">
          {
            props.jobs.map((job,idx) => (
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
        </div>
    );
  }
}

export default ShowJobs;