import { useEffect, useState } from "react";
import { useAuth } from "../../context/authUser";
import './user.css';
import {FaFileUpload} from 'react-icons/fa'

const User = () => {
  const { fetchUser} = useAuth();
  const [data,setData] = useState({});
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(()=> {
    const initial = async() => {
      const lg = !!sessionStorage.getItem("token");

      if (lg) {
        const res = await fetchUser(sessionStorage.getItem("token"));
        res ? setData(res) : window.location.replace('/login');
      }
      else {
        window.location.replace('/login');
      }
    };
    
    initial();

  },[fetchUser]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setUploading(true);
    setTimeout(()=>{
      setUploading(false)
    },10000);
  }

  return(
    <div className="userProfile">
      <div className="userContainer">
        <img src={data.profilePic || `https://robohash.org/${data.name}`} alt={data.name} width={'28px'} />
        <br />
        <label htmlFor="usrnm">Username</label>
        <input type="text" id="usrnm" name="usrnm" />
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" />
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lanme" id="lname" />
        <label htmlFor="uemail">Email <span>*</span></label>
        <input type="email" name="uemail" id="uemail" disabled value={data.email || ""}/>
        <label htmlFor="uskills">My Skills</label>
        <ul className="skillsContainer">
          {
            data.skills ? data.skills.map((skill,idx) => (
              <li key={idx}>{skill.name}</li>
            ))
            :
            <li>add your skills</li>
          }
        </ul>
        <div>
          <input type="file" name="cfile" id="cfile" onChange={handleFileChange} />
          <label id="flbl" htmlFor="cfile"><span>{resume? "Update File" : "Upload File"}</span>{uploading? <span></span> : <FaFileUpload/>}</label>
        </div>
      </div>
    </div>
  )
}

export default User;