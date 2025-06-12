import { BiChevronRight } from "react-icons/bi";
import JobCard from "../jobcard/JobCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authUser";
const jwt = require('jwt-decode');
function AppliedJobs() {
  const [active, setActive] = useState('applied');
  const {token, role} = useAuth();
  const [jobs, setJobs] = useState([]);
  const { id } = jwt.jwtDecode(token);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/job/applied?token=${token}`).then(user => {
      console.log(user.data);
      setJobs(user.data);
    })
  },[token])
  
  return (
    <div className="chat_wrapper">
      <p style={{display: "flex", alignItems: "center", fontSize: "small"}}><BiChevronRight size={20}/> Applied Jobs</p>
      <div>
        {/* <div style={{display: "flex", gap: "1.25rem", alignItems: "center"}}>
          <button style={{backgroundColor: active === 'applied' ? 'rgb(245, 245, 245)' : 'blue', padding: "0.25rem 0.5rem", borderRadius: "1.5rem", fontSize: "x-small"}}>Applied</button>
          <button>Saved</button>
        </div> */}
        <div style={{padding: "0.5rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
          {
            jobs.map((job, idx) => (
              <div className='card_job' key={idx}>
                <JobCard job = {job}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default AppliedJobs;