import { useEffect, useState } from "react";
import { Jobs } from "../../utils/fetch";
import JobCard from "../jobcard/JobCard";
import './showJobs.css'
function ShowJobs(props) {
  const [jobs,setJobs] = useState([]);
  useEffect(()=>{
    !!props.jobs ? setJobs(props.jobs) : Jobs().then(data => setJobs(data)).catch(err=>console.log(err));
  },[props])
  return (
    <div className="jobs_wrapper">
        {
          jobs && jobs.map((job,idx)=>(
            <JobCard {...job} key={idx}/>
          ))
        }
    </div>
  )
}

export default ShowJobs;