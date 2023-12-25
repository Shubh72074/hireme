import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authUser";
import { useEffect, useState } from "react";
import "./login.css";
import Alert from "../alert/alert";

const Login = () => {
  const { login, register, isLoggedIn } = useAuth();
  const nav = useNavigate();

  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState("login");

  useEffect(() => {
    if (!!sessionStorage.getItem("token") && isLoggedIn) {
      redirect("/");
    }
  }, [nav,isLoggedIn]);

  const handleErrorEffect = (ele) => {
    ele.classList.toggle('error');
  }

  const handleAlert = () => {
    setShowAlert(true);
    const timer =  setTimeout(()=>{
      setShowAlert(false);
    },5100);
    return ()=> clearTimeout(timer);
}
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email");
    const password = document.getElementById("pass");


    if (email.value) {
      if (password.value) {
        const res = await login(email.value, password.value);
        if (res.status) {
          nav("/user");
        } else {
          setError({
            msg: res.msg,
            type: "ERROR",
          });
          handleAlert();
        }
      } else {
        setError({
          msg: "PASSWORD_IS_NOT_VALID",
          type: "ERROR",
        });
        setShowAlert(true);
        handleErrorEffect(password);
      }
    } else {
      setError({
        msg: "EMAIL_IS_NOT_VALID",
        type: "ERROR",
      });
      setShowAlert(true);
      handleErrorEffect(email);
    }

  };

  const handleFileChange = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
          const base64Img = reader.result;
          setFile(base64Img);
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }
  
  const Register = async (e) => {
    e.preventDefault();

    const reg_name = document.getElementById("rname");
    const reg_email = document.getElementById("remail");
    const reg_password = document.getElementById("rpass");

    if (reg_name.value) {
      if (reg_email.value) {
        if (reg_password.value) {
          
            try {
              const formData = {
                'name' : reg_name.value,
                'email' : reg_email.value,
                'password' : reg_password.value,
                'profilePic' : file || ''
              }

              const res = await register(formData);
              setError({
                msg: res.msg,
                type: "SUCCESS",
              });
              setShowAlert(true);

              if (res.status) {
                nav('/');
              }
              else {
                setError({
                  msg: "SOMETHING_WENT_WRONG",
                  type: "ERROR",
                });
                setShowAlert(true);
              }
            }
            catch (err) {
              setError({
                msg: "FILE_ERROR",
                type: "ERROR",
              });
              setShowAlert(true);
            }
          
        }
        else {
          setError({
            msg: "PASSWORD_IS_NOT_VALID",
            type: "ERROR",
          });
          setShowAlert(true);
          handleErrorEffect(reg_password);
        }
      } else {
        setError({
          msg: "EMAIL_IS_NOT_VALID",
          type: "ERROR",
        });
        setShowAlert(true);
        handleErrorEffect(reg_email);
      }
    } else {
      setError({
        msg: "NAME_IS_NOT_VALID",
        type: "ERROR",
      });
      setShowAlert(true);
      handleErrorEffect(reg_name);
    }
  };


  return (
    <div className="form">
      {showAlert && (
        <Alert
          msg={error ? error.msg : "INVALID_INPUT"}
          type={error ? error.type : "ERROR"}
        />
      )}
      {toggle === "login" ? (
        <form onSubmit={handleLogin} className="loginForm">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="pass">Password</label>
          <input type="password" id="pass" minLength={8} required/>
          <div>
            <button type="submit">Login</button>
            <button
              onClick={(e) => {
                console.log(e.type);
                e.preventDefault();
                setToggle("register");
              }}
            >
              Register
            </button>
          </div>
        </form>
      ) : (
        <div className="registerForm">
          <label htmlFor="rname">Name</label>
          <input type="text" id="rname" required />
          <label htmlFor="remail">Email</label>
          <input type="email" id="remail" required />
          <label htmlFor="avatar">
            Profile <span>( .png / .jpg )</span>
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <label htmlFor="rpass">Password</label>
          <input type="text" id="rpass" required />
          <div>
            <button onClick={Register}>Register</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setToggle("login");
              }}
            >
              LogIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
