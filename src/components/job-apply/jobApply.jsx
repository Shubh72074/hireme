import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./jobApply.css";
import PageNotFound from "../../pages/error/page-not-found";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authUser";

const JobApply = () => {
  const { jobid } = useParams();
  const [job, setJob] = useState(null);
  const { token, role } = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/job/${jobid}?token=${token}`).then(job => {
      setJob(job.data);
    })
  }, [jobid, token]);

  const handleApply = () => {
    try{axios.get(`${process.env.REACT_APP_API_URL}/${role}/apply?jobid=${jobid}&token=${token}`).then((res) => {
      toast.success(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
    }).catch(err => {
      toast.error(err.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  } catch (error) {
      let message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
    <Header />

      {job ? (
        <div className="job-apply-container">
          <div className="job-card">
            <div className="job-header">
              {job.company_logo && (
                <img src={job.company_logo} alt="Company Logo" className="company-logo" />
              )}
              <div className="job-header-text">
                <h1>{job.title}</h1>
                <p className="company-name">{job.company}</p>
                <p className="job-location">{job.location}</p>
              </div>
            </div>

            <div className="job-details">
              <div className="detail-item">
                <span>Job Type:</span> {job.job_type}
              </div>
              <div className="detail-item">
                <span>Domain:</span> {job.category}
              </div>
              <div className="detail-item">
                <span>Experience Required:</span> {job.req_exp} years
              </div>
              <div className="detail-item">
                <span>Required Skills:</span> {job.req_skills?.join(", ")}
              </div>
              <div className="detail-item">
                <span>Salary Range:</span> ₹{job.salary?.[0]} - ₹{job.salary?.[1]}
              </div>
              <div className="detail-item">
                <span>Apply By:</span> {new Date(job.applyBy).toLocaleDateString()}
              </div>
              <div className="detail-item">
                <span>Status:</span> 
                <span className={`status ${job.status === "open" ? "open" : "closed"}`}>
                  {job.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="job-description">
              <h2>Job Description</h2>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>

            <div className="job-buttons">
              <button onClick={handleApply} className="btn primary-btn">
                Apply Now
              </button>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(job.title + "\n\n" + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary-btn"
              >
                Share via WhatsApp
              </a>
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
