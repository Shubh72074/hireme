import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authUser"
import { useEffect } from "react";

const Login = () => { 
  const {isSignedIn,login} = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    isSignedIn ? nav('/') : console.log("log in");
  },[isSignedIn,nav])
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    const status = await login({email,pass});

    status ? nav('/') : console.log("ERROR");

  }

  return (
    <div>
      <input type="email" id="email" required/>
      <input type="password" id="pass" required/>
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  )
}

export default Login;