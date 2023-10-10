import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./jobApply.css";
import PageNotFound from "../../pages/error/page-not-found";
import Header from "./../header/header";
import Footer from "./../footer/footer";

const JobApply = () => {
  const params = useParams();

  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_API_URL}/job/${params.jobid}`
        );

        const jobData = await resp.json();

        setJob(jobData);
      } catch (err) {
        setJob(null);
        console.log(err);
      }
    };
    fetchJob();
  }, [params]);

  return (
    <>
      <Header />
      {job !== null ? (
        <div className="job-apply-container">
          <div
            className="job-apply-div"
            dangerouslySetInnerHTML={{ __html: job.description }}
          >
          </div>
          <div className="company-details">
            <p>Job Details</p>
            <p>Title</p> 
            
            <p>{job.title}</p>
            <p>Work Location</p>
            <p id="c_name">{job.candidate_required_location}</p>
            <p>Domain</p>
            <p>{job.category}</p>
            <div>
              <button>Apply</button>
              <button>Share</button>
            </div>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}

      <Footer />
    </>
  );
};

export default JobApply;
