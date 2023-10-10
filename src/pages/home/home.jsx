import "./home.css";
import React, { useEffect, useState } from 'react';
import Header from "../../components/header/header";
import SearchBox from "../../components/searchjobs/searchBox";
import Footer from "../../components/footer/footer";
import ShowJobs from "../../components/jobs/showJobs";
import {FcNews} from 'react-icons/fc';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`);
        const jsonData = await response.json();
        setData(jsonData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>
    <SearchBox/>
    <main role='main' className="main-container">
      <div className="call_action">
        <FcNews size={"90px"}/>
        <p>Subscribe to our newsletter to get updates about new job openings, straight to your mailbox.</p>
        <input type="email" name="s-email" id="s-email" placeholder="abc@example.com" />
        <button>SUBSCRIBE WITH EMAIL</button>
      </div>
      <ShowJobs jobs={data}/>
    </main>
    <Footer/>
    </>
  )
}

export default Home;
