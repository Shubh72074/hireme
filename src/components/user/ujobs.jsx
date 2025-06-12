import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../jobcard/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/job`).then(_jobs => {
      setJobs(_jobs.data);
    }).catch(err => console.log(err));
  }, [])
  return (
    <div className="chat_wrapper">
        {
              jobs.map((job, idx) => (
                <div className='card_job' key={idx}>
                  <JobCard job={job} />
                </div>
              ))
        }
    </div>
  )
}

export default Jobs;