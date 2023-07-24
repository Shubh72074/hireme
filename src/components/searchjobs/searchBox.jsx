import { AiOutlineClose, AiOutlineSearch, } from "react-icons/ai";
import "./searchBox.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const nav = useNavigate();
  useEffect(()=> {
    const inputVal = document.getElementById("query");
    const ul = document.getElementById('tags').childNodes;
    ul.forEach((li) => {
      li.addEventListener('click', (e)=> {
        e.preventDefault();
        inputVal.value = e.target.textContent;
      })
    })
  },[])

  const handleClearClick = () => {
    const inputVal = document.getElementById("query");
    inputVal.value = "";
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const inputVal = document.getElementById("query");
    inputVal.value ===""?inputVal.style.cssText="" : nav(`/jobs/${inputVal.value}`)
  }

  return (
    <div className="search-container">
      <h1>Over 250+ Hiring Partners and Companies</h1>
      <p>Get your dream job with us. Search through 1000+ jobs and find your suitable profile.</p> 
      <div className="search-box">
        <button onClick={handleSearch}>
          <AiOutlineSearch size={'18px'} />
        </button>
        <input type="text" id="query" disabled/>
        <button onClick={handleClearClick}><AiOutlineClose size={'18px'}/></button>
      </div>
      <div className="tags-box">
        <ul id="tags">
          <li>Software Development</li>
          <li>Customer Service</li>
          <li>Design</li>
          <li>Marketing</li>
          <li>Sales</li>
          <li>Product</li>
          <li>Business</li>
          <li>Data</li>
          <li>DevOps/Sysadmin</li>
          <li>Finance/Legal</li>
          <li>Human Resources</li>
          <li>QA</li>
          <li>Writing</li>
          <li>All Others</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchBox;
