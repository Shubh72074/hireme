import { createContext, useContext, useEffect, useState } from "react";
const jwt_decode = require("jwt-decode");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // JWT token
  const [role, setRole] = useState(null); // JWT token

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode.jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        console.log(`token expired, loggin out`);
        logout();
      } else {
        setToken(token);
        setRole(decoded.role);
      }
    }
  }, []);

  const login = (token) => {
    setToken(token);
    const decoded = jwt_decode.jwtDecode(token);
    setRole(decoded.role);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
