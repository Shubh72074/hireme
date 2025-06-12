import { Link } from "react-router-dom";
import { useAuth } from "../../context/authUser";
import "./login.css";
import { BiCheck, BiChevronRight } from "react-icons/bi";
import { toast } from "react-toastify";
import Logo from "../../utils/logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = (props) => {
  const { login, token } = useAuth();
  const Navigate = useNavigate();
  const [exp, setExp] = useState("Fresher");

  // if (token) Navigate("dashboard");
  
  useEffect(()=>{
    if (token) Navigate("/user/dashboard", {
      replace: true,
    });
  },[token, Navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, formData);

      let { message, token } = res.data;

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

      Navigate("/user/dashboard", { replace: true });

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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formData);

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
      
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";

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
  return (
    <div className="login_page">
      <header style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 20px", backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1200px" }}>
          <Logo />
          <Link to={"/user/register"} style={{ display: "flex", alignItems: "center", backgroundColor: "white", border: "1px solid orangered", color: "orangered", padding: "4px 6px", width: "max-content", borderRadius: "4px" }}><span>New User?</span>&nbsp;Register <BiChevronRight size={24} /></Link>
        </div>
      </header>
      <div className="login_container">
        <div className="login_logo">
          <img src={require("./../../assets/undraw_resume-folder_hf4p.svg").default} width={100} height={100} alt="dp" />
          <ul className="benefit_bullets">
            <li><BiCheck color="white" /> Find your dream job</li>
            <li><BiCheck color="white" /> Get hired faster</li>
            <li><BiCheck color="white" /> Build your resume</li>
            <li><BiCheck color="white" /> Get noticed by employers</li>
            <li><BiCheck color="white" /> Apply for jobs easily</li>
            <li><BiCheck color="white" /> Get job alerts</li>
            <li><BiCheck color="white" /> Save jobs for later</li>
            <li><BiCheck color="white" /> Track your applications</li>
          </ul>
        </div>
        <div className="form_wrapper">
          {
            props.page === "login" ? (
              <div className="login_form">
                <h1>Login</h1>
                <form onSubmit={handleLogin} method="POST" encType="multipart/form-data">
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="email">Email ID <span style={{ color: "red" }}>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    <p>Invalid Email address</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="pass">Password <span style={{ color: "red" }}>*</span></label>
                    <input type="password" id="pass" name="password" minLength={6} placeholder="Password" required />
                    <p>Password must be of 6 characters.</p>
                  </div>
                  <button type="submit">Login</button>
                </form>
                <p style={{ textAlign: "center", width: "100%", textWrap: "nowrap" }}>Don't have an account? <Link to={"/user/register"} style={{ color: "brown" }}>Register Now.</Link></p>
              </div>
            )
              : (<div className="register_form">
                <h1>Register</h1>
                <form onSubmit={handleRegister} style={{transition: 'all ease-in-out 600ms'}} method="POST" encType="multipart/form-data">
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="name">Full Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required />
                    <p>Name is required</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="email">Email ID <span style={{ color: "red" }}>*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    <p>Invalid email address.</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="password">Password <span style={{ color: "red" }}>*</span></label>
                    <input type="password" minLength={6} id="password" name="password" placeholder="Password" required />
                    <p>Minimum: 6 Characters required.</p>
                  </div>
                  { (exp === 'experienced') && <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="resume">Upload Resume <span style={{ color: "red" }}>*</span></label>
                    <input type="file" id="resume" name="resume" accept='.pdf,.docx' />
                    <p>Format required: .pdf or .docx</p>
                  </div>}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "small" }}>
                    <label>Fresher/Experienced <span style={{ color: "red" }}>*</span></label>
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "small" }}>
                      <input type="radio" id="exp" value={"experienced"} onChange={(e)=>setExp(e.target.value)} checked={exp === 'experienced'} name="work_exp" hidden />
                      <label htmlFor="exp"><p style={{ fontWeight: "600", fontSize: "small" }}>I'm experienced</p><p style={{ fontWeight: "400", fontSize: "small" }}>Have more than a year of experience</p><p className="checkCircle"><BiCheck /></p></label>
                      <input type="radio" id="fresher" value={"fresher"} onChange={(e)=>setExp(e.target.value)} checked={exp === 'fresher'} name="work_exp" hidden />
                      <label htmlFor="fresher"><p style={{ fontWeight: "600", fontSize: "small" }}>I'm a fresher</p><p style={{ fontWeight: "400", fontSize: "small" }}>Student / No working experience</p><p className="checkCircle"><BiCheck /></p></label>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "small" }}>
                    <label htmlFor="profilePic">Profile Pic<span style={{ color: "red" }}>*</span></label>
                    <input type="file" id="profilePic" name="profilePic" accept='.jpg,.png,.jpeg,.gif' />
                    <p>Format required: .pdf or .docx</p>
                  </div>
                  <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to={"/user/login"} style={{ color: "blue" }}>Login</Link></p>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
