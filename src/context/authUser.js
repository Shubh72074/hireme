import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const login =  async (email, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (res.ok) {
      const user = await res.json();
      setUser(user);
      setIsSignedIn(true);
      return true;
    }
    else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isSignedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}