import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './jobApply.css';
import PageNotFound from "../../pages/error/page-not-found";

const JobApply = () => {

  const params = useParams();

  const [job,setJob] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/job/${params.jobid}`);
        
        const jobData = await resp.json();
       
        setJob(jobData);
      }
      catch (err) {
        setJob(null)
        console.log(err);
      }
    }
    fetchJob();
  }, [params]);


  return (
    <>
      <div>
        { job == null ? <PageNotFound/> : <div dangerouslySetInnerHTML={{ __html: job.description }}></div> }
      </div>
    </>
  )
}

export default JobApply;