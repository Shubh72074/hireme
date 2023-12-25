import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import "./searchBox.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../alert/alert";

const SearchBox = () => {
  const nav = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [fTags, setFTags] = useState([]);
  const [query,setQuery] = useState("");
  useEffect(() => {
    const fet = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/categories`)
        .then((res) => {
          res.json().then((data) => setCategories(data));
        })
        .catch((err) => console.log(err));
    };

    const fetchTags = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/tags`)
        .then((res) => {
          res.json().then((data) => setTags(data));
        })
        .catch((err) => console.log(err));
    };

    fet();
    fetchTags();
  }, []);

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleClearClick = () => {
    setQuery("");
    setFTags([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const param = encodeURIComponent(query);
    if (param) {
      const getCat = async (param) => {
        await fetch(`${process.env.REACT_APP_API_URL}/searchByTag/${param}`).then(res=>{
          res.json().then(data=>nav(`jobs/${encodeURIComponent(data.category)}`))
        }).catch(err=>console.log(err));
      }
      getCat(param);
    }
    else {
      handleAlert();
    }
  };

  const handleInput = (e) => {
    let result = [];
        let input = e.target.value;
        setQuery(input);
        if (input.length) {
          result = tags.filter((kw)=>{
            return kw.toLocaleLowerCase().includes(input.toLocaleLowerCase());
          });
          console.log(result);
        }

    console.log(result);

    setFTags(result.slice(0,6));

  };

  return (
    <div className="search-container">
      {showAlert && <Alert type="ERROR" msg="NO_INPUT_ERROR" />}
      <h1>Over 250+ Hiring Partners and Companies</h1>
      <p>
        Get your dream job with us. Search through 1000+ jobs and find your
        suitable profile.
      </p>
      <div className="search_wrapper">
        <div className="search-box">
          <button onClick={handleSearch}>
            <AiOutlineSearch size={"18px"} />
          </button>
          <input type="text" id="query" onInput={handleInput} value={query} />
          <button onClick={handleClearClick}>
            <AiOutlineClose size={"18px"} />
          </button>
        </div>
        <ul id="keywords_box">
          {
            fTags.map((tag,idx)=>(
              <li key={idx} onClick={(e)=>{
                e.preventDefault();
                setQuery(e.target.innerText);
                setFTags([]);
              }}>{tag}</li>
            ))
          }
        </ul>
      </div>
      <div className="tags-box">
        <ul id="tags">
          {categories.map((category, idx) => (
            <Link key={idx} to={`jobs\\${encodeURIComponent(category._id)}`}>
              <li>{category._id}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBox;
