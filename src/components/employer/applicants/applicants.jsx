import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/authUser'
import axios from 'axios';

function Applicants() {
  const {token, role} = useAuth;
  const [applicants, setApplicants] = useState(null);
  useEffect(() => {
    console.log(token);
    axios.get(`${process.env.REACT_APP_API_URL}/${role}/applicants?token=${token}`).then(applicants => {
      setApplicants(applicants.data);
    }).catch(err => console.log(err))
  },
  [token, role])
  return (
    <div style={{display: 'flex'}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "600px"}}>
            {
              applicants && applicants.map((applicant, idx) => (
                <Link style={{display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%"}} to={`applicant?id=${applicant._id}`} key={idx}>
                  <img style={{width: "40px", height: "40px", border: "1px solid rgb(230, 240, 244)", borderRadius: "50%", padding: "4px"}} src={`${process.env.REACT_APP_API_URL}/${applicant.profilePic}`} alt="profile" />
                  <p>{applicant.name}</p>
                </Link>
              ))
            }
          </div>
        </div>
  )
}

export default Applicants