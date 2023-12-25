import { Link } from "react-router-dom";
import "./jobCard.css";

function JobCard(props) {
  return (
    <div className="card">
      <div className="c">
        <div className="title">
          <div className="job-title">{props.title}</div>
          <div className="company-detail">{props.company_name}</div>
        </div>
        <div className="company-logo">
          <img src={props.company_logo} alt="" />
        </div>
      </div>
      <div className="c">
        <div className="salary">
          <p>Salary</p>
          <p>$400 - $1k</p>
        </div>
        <div className="line"></div>
        <div className="location">
          <p>Location</p>
          <p>{props.candidate_required_location}</p>
        </div>
      </div>
      <div className="tagsBox">
        {props.tags.map((tag, idx) => (
          <div key={idx} className="tags">
            {tag}
          </div>
        ))}
      </div>
      <div className="c">
        <div className="posted-at">{props.publication_date}</div>
      </div>
      <div className="c">
        <div className="share">
          <button>fav</button>
          <button>share</button>
        </div>
        <div className="apply">
          <Link to={`/job/${props.id}`}>View</Link>
          <Link to={`/job/${props.id}`}>Apply</Link>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
