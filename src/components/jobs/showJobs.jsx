import { useEffect, useState } from "react";
import JobCard from "../jobcard/JobCard";
import './showJobs.css'
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../header/header";
function ShowJobs(props) {
  const location = useLocation();
  const [jobs, setJobs] = useState([
    {
      title: "Frontend Developer",
      description: "Develop and maintain user-facing features.",
      location: "New York, NY",
      company: "TechCorp",
      salary: [60000, 80000],
      applyBy: new Date('2025-06-30'),
      status: "open",
      company_logo: "https://img.naukimg.com/logo_images/groups/v1/311708.gif",
      job_type: "full-time",
      category: "Software Development",
      req_skills: ["JavaScript", "React", "CSS"],
      req_exp: 2,
      applicants: [
        {
          userid: "662c0e2e2f8b1a2d3c5b8f9a",  // fake ObjectId string
          status: "applied",
          appliedAt: new Date(),
          resume: "https://random.imagecdn.app/150/150",
        },
        {
          userid: "662c0e2e2f8b1a2d3c5b8f9b",
          status: "interviewed",
          appliedAt: new Date(),
          resume: "https://random.imagecdn.app/150/150",
        }
      ],
      publisher: "662c0e2e2f8b1a2d3c5b8f90" // fake employer ObjectId
    },
    {
      title: "Backend Developer",
      description: "Build server-side applications and APIs. Fht jnennd jnalnsdlkn wejnklnajsd jn snd jelnad  ajnfla jnsoiea asdne",
      location: "Remote",
      company: "Innovatech",
      salary: [70000, 90000],
      applyBy: new Date('2025-07-15'),
      status: "open",
      company_logo: "https://img.naukimg.com/logo_images/groups/v1/163978.gif",
      job_type: "full-time",
      category: "Software Development",
      req_skills: ["Node.js", "MongoDB", "Express"],
      req_exp: 3,
      applicants: [
        {
          userid: "662c0e2e2f8b1a2d3c5b8f9c",
          status: "hired",
          appliedAt: new Date(),
          resume: "https://random.imagecdn.app/150/150",
        }
      ],
      publisher: "662c0e2e2f8b1a2d3c5b8f91"
    }
  ]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL + "/job" + location.search}`).then(jobs => {
      if (jobs.data.length > 0) {
        setJobs(jobs.data);
      }
    })
  }, [location])
  return (
    <>
      <Header/>
      <div style={{display: 'flex', justifyContent: 'center', width: '100%', padding: '1.75rem', backgroundColor: "rgb(246, 247, 249)"}}>
        <div style={{display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'space-between',}}>
          <div style={{width: '280px', minHeight: '600px', backgroundColor: 'white', borderRadius: '1.25rem', border: '1px solid rgb(216, 216, 216)'}}>
          </div>
          <div className="jobs_wrapper">
            <div style={{display:'flex', alignItems: 'center',height: '3.5rem', borderBottom: '1px solid rgb(225, 225, 225)'}}>
              <p style={{color: 'rgb(111, 111, 111)', fontSize: 'small'}}>{jobs.length} total results</p>
            </div>
            {
              jobs.map((job, idx) => (
                <div className='card_job' key={idx}>
                  <JobCard job={job} />
                </div>
              ))
            }
          </div>
          <div style={{width: '280px', minHeight: '600px', borderRadius: '1.25rem'}}>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowJobs;