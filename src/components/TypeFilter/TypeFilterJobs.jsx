import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ShowJobs from "../jobs/showJobs";
import Header from "../header/header";
import Footer from "../footer/footer";

const TypeFilterJobs = () => {
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  useEffect(()=>{
    let type = encodeURIComponent(params.type);
    if (type==="All%20Others") type = "";
    const fetchJobs = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/jobss/${type}`);
      if (res.ok) {
        const jsonData = await res.json();
        setJobs(jsonData);
      }
      else {
        console.log("err");
      }
    }

    fetchJobs();
  },[params])
  return(
    <>
    <Header/>
    <ShowJobs jobs = {jobs}/>
    <Footer/>
    </>
  )
}

export default TypeFilterJobs;