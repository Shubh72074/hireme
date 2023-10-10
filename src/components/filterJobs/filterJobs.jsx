import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ShowJobs from "../jobs/showJobs";
import Header from "../header/header";
import Footer from "../footer/footer";

const FilterJobs = () => {
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  useEffect(()=>{
    let category = encodeURIComponent(params.param);
    console.log(category);
    if (category==="All%20Others") category = "";
    const fetchJobs = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${category}`);
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

export default FilterJobs;