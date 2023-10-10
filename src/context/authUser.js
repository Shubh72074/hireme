import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login =  async (email, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({email : email, password : password}),
    });

    if (res.ok) {
      const user = await res.json();

      sessionStorage.setItem("token",user.token);

      setIsLoggedIn(true);

      const data = {
        status: true,
        user,
      }
      return data;
    }
    else {
      const er = await res.text()
      const data = {
        status: false,
        msg : er
      }
      return data;
    }
  };

  const register =  async (formData) => {
    console.log("in reg");
    console.log(formData);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const user = await res.json();
      sessionStorage.setItem("token",user.token);
      setIsLoggedIn(true);
      return {
        status : res.ok,
        msg: res.statusText,
      };
    }
    else {
      console.log("error");
      return false;
    }
  };

  const fetchUser = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({token:token}),
    });
    if (res.ok) {
      const dt = await res.json();
      setIsLoggedIn(true);
      return dt;
    }
    else {
      setIsLoggedIn(false);
      return false;
    }
  }

  const logout = () => {
    const r = sessionStorage.removeItem("token");
    console.log(r);
    window.location.reload();
  };

  const value = {
    isLoggedIn,
    register,
    fetchUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}