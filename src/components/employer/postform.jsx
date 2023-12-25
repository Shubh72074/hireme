import { useState } from "react";
import "./postjobform.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendar } from "react-icons/fa";

function PostJobForm(props) {
  const [documentContent, setDocumentContent] = useState("");
  const [joiningDate,setJoiningDate] = useState(new Date());
  const [showCalendar,setShowCalendar] = useState(false);

  const [formData,setFormData] = useState({
    "jobTitle" : "",
    "requiredSkills" : [],
    "salaryRange" : [],
    "jobDescription" : "",
    "jobType" : "",
    "joiningDate" : "",
    "workExp" : "",
    "openings" : "",
    "benefits" : [],
  })

  const handleEditorChange = (content) => {
    setDocumentContent(content);
  };

  const setDate = (date) => {
    setJoiningDate(date);
    setShowCalendar(prev=>!prev);
  }
  const handleSubmit = () => {
    console.log(formData);
  }
  return (
    <div className="postJob_wrapper">
      <div className="postJobForm">
        <div>
          <label htmlFor="job_title">Job Title*</label>
          <select name="job_title" id="job_title" onChange={(e)=>{
            setFormData({
              "jobTitle" : e.target.selectedOptions[0].value
            })
          }}>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Big Data Engineer">Big Data Engineer</option>
            <option value="Blockchain Developer">Blockchain Developer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="Game Developer">Game Developer</option>
            <option value="MLOps Developer">MLOps Developer</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="Wordpress Developer">Wordpress Developer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Testing Engineer">Testing Engineer</option>
          </select>
        </div>
        <div>
          <label htmlFor="r_skills">Required Skills*</label>
          <input type="text" name="r_skills" id="r_skills" />
          <div className="skills_box"></div>
        </div>
        <div>
          <label>Salary Range*</label>
          <input
            type="number"
            id="sr_l"
            placeholder="e.g ₹3.6"
            min={3}
            max={100}
            step={0.1}
            onChange={(e) => {
              e.preventDefault();
              const ele = document
                .getElementById("sr_u");
              ele.setAttribute("min", e.target.value);
              ele.removeAttribute("disabled");
            }}
          />
          <span>to</span>
          <input
            type="number"
            disabled
            id="sr_u"
            placeholder="e.g ₹7.2"
            max={100}
            step={0.1}
          />
          <span>LPA</span>
        </div>
        <div>
          <label htmlFor="job_desc">Job Description*</label>
          <ReactQuill
            id="_jdesc"
            value={documentContent}
            onChange={handleEditorChange}
            placeholder="Write your document..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
            ]}
          />
        </div>
        <div>
          <label htmlFor="_jtype">Job Type*</label>
          <select name="_jtype" id="_jtype">
            <option value="office">In-Office</option>
            <option value="remote">In-Office</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label htmlFor="joining_date">Preferred Joining Data*</label>
          <input type="text" name="joining_date" id="joining_date" value={joiningDate.toLocaleDateString()} readOnly />
          <span id="calendar_lg" onClick={()=>{setShowCalendar((prev)=>!prev)}}><FaCalendar size={"24px"}/></span>
          {showCalendar && <Calendar onChange={setDate} value={joiningDate} minDate={new Date()} />}
        </div>
        <div>
          <label htmlFor="w_xp">Work Experience*</label>
          <select name="w_xp" id="w_xp">
            <option value="1">0-3 years</option>
            <option value="2">3+ years</option>
          </select>
        </div>
        <div>
          <label htmlFor="openings">No. Of Openings*</label>
          <input type="number" name="openings" id="openings" min={1} />
        </div>
        <div>
          <label htmlFor="benefits">Added Benefits</label>
          <div>
            <label htmlFor="b_1">5 days a week</label>
            <input type="checkbox" id="b_1" />
          </div>
          <div>
            <label htmlFor="b_2">Health Insurance</label>
            <input type="checkbox" id="b_2" />
          </div>
          <div>
            <label htmlFor="b_3">Life Insurance</label>
            <input type="checkbox" id="b_3" />
          </div>
          <div>
            <label htmlFor="b_4">Transportation facility</label>
            <input type="checkbox" id="b_4" />
          </div>
        </div>
        <div className="a_btns">
          <Link to={"/jobs"}>View Sample</Link>
          <div className="s_btns">
            <button type="button" onClick={()=>{
              props.setShowPostJob(prev=>!prev);
              // console.log(setShowPostJob);
            }}>Cancle</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJobForm;
