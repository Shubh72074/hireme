import {React, useEffect, useState}from "react";
import "./searchBox.css";
import { BiSearch } from "react-icons/bi";
import axios from "axios";


const SearchBox = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [l, setL] = useState("");
  const [q, setQ] = useState("");
  const [e, setE] = useState(0);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/locations`).then(res => {
      setLocations(res.data);
    }).catch(err => console.log(err));
  },[]);
  const handleLocationChange = (e) => {
    e.preventDefault();
    setL(e.target.value);
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLocations(filtered);
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Find Your Dream Job</h1>
        <p>Explore thousands of opportunities tailored just for you</p>
      </div>
      <form action="jobs" className="search-wrapper">
        <BiSearch size={56} color="darkgray" />
        <input
          type="text"
          name="q"
          id="query"
          placeholder="Search jobs, companies, or keywords"
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="divider"></div>
        <select
          name="e"
          id="experience"
          onChange={(e) => setE(e.target.value)}
        >
          <option value="0">Select Experience</option>
          <option value="1">Fresher</option>
          <option value="2">1 Year</option>
          <option value="3">2 Years</option>
          <option value="4">3 Years</option>
          <option value="5">4 Years</option>
          <option value="6">5+ Years</option>
        </select>
        <div className="divider"></div>
        <div className="location-wrapper">
          <input
            type="text"
            name="l"
            value={l}
            placeholder="Enter location"
            onChange={handleLocationChange}
            onFocus={(e) => (e.target.nextSibling.style.display = "block")}
          />
          <ul className="location-list" id="location-list">
            {filteredLocations.map((location, idx) => (
              <li
                key={idx}
                className="location-item"
                onClick={(e) => {
                  e.preventDefault();
                  setL(location);
                  e.target.parentNode.style.display = "none";
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="search-button"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
