import React from 'react'
import './../jobcard/jobCard.css'
import { BiBookmark, BiRupee } from 'react-icons/bi';
import { FaSuitcase } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { Navigate, useNavigate } from 'react-router-dom';

function JobCard({ job}) {
  const { title, company, company_logo, location, description, salary, req_exp, req_skills } = job;
  const nav = useNavigate()
  const handleApply = () => {
    nav(`/apply/${job._id}`)
  }
  return (
    <>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}} onClick={handleApply}>
        <div>
          <p style={{ fontWeight: 600, }}>{ title }</p>
          <p style={{ fontWeight: 400}}>{ company }</p>
        </div>
        <div style={{ border: "1px solid rgba(229, 229, 229, 0.66)", padding:'2px 4px', overflow: "hidden", borderRadius: "0.75rem"}}>
          <img src={`${company_logo}`} alt="company_logo" width={50} height={50} />
        </div>
      </div>
      <div style={{display: "flex", flexDirection: 'column', gap: '0.35rem'}}>
        <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: 'small', color: 'rgb(56, 56, 56)'}}>
          <p style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><FaSuitcase color='rgb(105, 105, 105)'/> {req_exp} Yrs</p>
          <span style={{width: '1px', height: '0.5rem', backgroundColor: 'rgb(201, 201, 201)'}}></span>
          <p style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><BiRupee color='rgb(105, 105, 105)'/>{salary[0]}-{salary[1]} LPA</p>
          <span style={{width: '1px', height: '0.5rem', backgroundColor: 'rgb(201, 201, 201)'}}></span>
          <p style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><FaLocationPin color='rgb(105, 105, 105)'/>{location}</p>
        </div>
        <div style={{width: '90%'}}>
          <p style={{display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: 'small', color: 'rgb(25, 25, 25)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{description}</p>
        </div>
        <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: 'small', color: 'rgb(147, 147, 147)'}}>
          {req_skills.map((skill, idx)=>(
            <span key={idx}>{skill}</span>
          ))}
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <p style={{display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: 'small', color: 'rgb(104, 104, 104)'}}>10 Days Ago</p>
        <BiBookmark onClick={()=>{}}/>
      </div>
    </>
  )
}

export default JobCard