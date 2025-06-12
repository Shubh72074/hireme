import Logo from "../../utils/logo";
import "./empLogin.css"
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiBuildingHouse, BiChevronRight, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authUser";
import axios from "axios";

function EmployerLogin({page}) {
  const { login } = useAuth();
  const Navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("individual");
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/employer/login`, formData).then(res => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      login(res.data.token);
      Navigate("/employer/dashboard", { replace: true });
    });
    } catch (error) {
      let message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/employer/register`, formData);
      const { message, token } = res.data;
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      login(token);
      Navigate("/employer/dashboard", { replace: true });
    } catch (error) {
      let message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 20px", backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1200px" }}>
          <Logo />
          <Link to={"/employer/register"} style={{ display: "flex", alignItems: "center", backgroundColor: "white", border: "1px solid purple", color: "purple", padding: "4px 6px", width: "max-content", borderRadius: "4px" }}>Create Account<BiChevronRight size={24} /></Link>
        </div>
      </header>
      <div style={{ display: "flex", justifyContent: "center", padding: "2.5rem 0", height: "calc(100vh - 60px)", backgroundColor: "#a6b1f7" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#d7e4ff", padding: "20px", borderRadius: "8px", marginRight: "-10px", zIndex: 10 }}>
          <img src={require("../../assets/undraw_team-page_q5am.svg").default} alt="Employer Illustration" style={{ width: "260px", marginBottom: "20px" }} />
          <div style={{ textAlign: "center", width: "280px", margin: "0 auto" }}>
            <p style={{ marginBottom: "15px", color: "#555" }}>
              HireMe is your ultimate recruitment partner, designed to help you find the right talent for your business needs. 
              Whether you're looking for experienced professionals or fresh talent, we've got you covered.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", maxWidth: "600px", width: "100%", overflowY: "scroll", padding: "2rem 2.5rem" }}>
          {page === "login" ? (<div style={{ padding: "20px", width: "100%" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Employer Login</h2>
            <form onSubmit={handleLogin} method="POST" encType="multipart/form-data">
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
                <input type="email" id="email" name="email" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
                <input type="password" id="password" name="password" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
              </div>
              <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", borderRadius: "1.25rem", border: "none", cursor: "pointer" }}>Login</button>
            </form>
          </div>) : (<div style={{ padding: "0 20px", width: "max-content", height: "max-content", fontSize: "small" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Employer Register</h2>
            <form onSubmit={handleRegister} method="POST" encType="multipart/form-data">
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name<span style={{color: "red"}}>*</span></label>
                <input type="text" id="name" name="name" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                <p className="error">Name is required</p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email<span style={{color: "red"}}>*</span></label>
                <input type="email" id="email" name="email" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                <p className="error">Not a valid email address</p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password<span style={{color: "red"}}>*</span></label>
                <input type="password" id="password" name="password" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                <p className="error">Error Occured</p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>Phone<span style={{color: "red"}}>*</span></label>
                <div style={{ width: "100%", borderRadius: "1.25rem", border: "1px solid #ccc", overflow: 'hidden' }}><span style={{backgroundColor: "rgb(242, 242, 242)", padding: '10px'}}>+91</span>
                  <input type="text" id="phone" name="phone" onChange={handleChange} value={phone} maxLength={10} minLength={10} required style={{outline: 'none', border: 'none', background: 'none', padding: '8px'}} />
                </div>
                  <p className="error">Phone is required</p>
              </div>

              <div style={{marginBottom: "15px"}}>
                <label style={{ display: "block", marginBottom: "5px" }}>Employer Type<span style={{color: "red"}}>*</span></label>
                <div style={{display: 'flex', gap: "1.5rem", alignItems: "center"}}>
                  <input type="radio" id="individual" onChange={(e) => {setType(e.target.value)}} name="type" checked={type === "individual"} value={"individual"}  hidden/>
                  <label htmlFor="individual" style={{position: "relative", maxWidth: "max-content", display: "flex", flexDirection: "column", gap: "0.25rem", border: "1px solid lightgray", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontSize: "small"}}><p style={{fontWeight: "600", display: "inline-flex", alignItems: "center", gap:"0.35rem"}}><BiUser/>Individual</p><p>Registering as an individual</p><span className="checkCircle"></span></label>
                  <input type="radio" name="type" id="organization" onChange={(e) => {setType(e.target.value)}} value={"organization"} checked={type === "organization"} hidden/>
                  <label htmlFor="organization" style={{position: "relative", maxWidth: "max-content", display: "flex", flexDirection: "column", gap: "0.25rem", border: "1px solid lightgray", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontSize: "small"}}><p style={{fontWeight: "600", display: "inline-flex", alignItems: "center", gap:"0.35rem"}}><BiBuildingHouse/>Organization</p><p>A company official e.g HR Management</p><span className="checkCircle"></span></label>
                </div>
              </div>
              {
                type === "individual" ? (
                  <div style={{marginBottom: "15px"}}>
                    <label htmlFor="profilePic" style={{ display: "block", marginBottom: "5px" }}>Profile Image<span style={{color: "red"}}>*</span></label>
                    <input type="file" id="profilePic" name="profilePic" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                    <p className="error">Upload a profile pic</p>
                  </div>
                ) : (
                  <>
                  <div style={{marginBottom: "15px"}}>
                    <label htmlFor="company_name" style={{ display: "block", marginBottom: "5px" }}>Company Name<span style={{color: "red"}}>*</span></label>
                    <input type="text" id="company_name" name="company_name" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                    <p className="error">Company name is required</p>
                  </div>
                  <div style={{marginBottom: "15px"}}>
                    <label htmlFor="company_logo" style={{ display: "block", marginBottom: "5px" }}>Company Logo<span style={{color: "red"}}>*</span></label>
                    <input type="file" id="company_logo" name="company_logo" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                    <p className="error">Company logo is required</p>
                  </div>
                  <div style={{marginBottom: "15px"}}>
                    <label htmlFor="company_url" style={{ display: "block", marginBottom: "5px" }}>Company Url</label>
                    <input type="text" id="company_url" name="company_url" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} />
                    <p className="error">Company url is required</p>
                  </div>
                  </>
                )
              }
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="location" style={{ display: "block", marginBottom: "5px" }}>Location<span style={{color: "red"}}>*</span></label>
                <input type="text" id="location" name="location" required style={{ width: "100%", padding: "8px", borderRadius: "1.25rem", border: "1px solid #ccc" }} placeholder="City e.g Mumbai" />
                <p className="error">Error Occured</p>
              </div>
              <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", borderRadius: "1.25rem", border: "none", cursor: "pointer" }}>Register</button>
            </form>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default EmployerLogin