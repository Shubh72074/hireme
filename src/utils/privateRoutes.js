import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authUser";
const jwt_decode = require("jwt-decode");

export function UserPrivateRoutes({ Component }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/user/login" />;
  }
  const decoded = jwt_decode.jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return <Navigate to="/user/login" />;
  }

  
  if (decoded.role === "employer") {
    return <Navigate to="/employer" />;
  }

  
  if (decoded.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return Component;
}


export function EmployerPrivateRoutes({Children}) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/employer/login" />;
  }
  const decoded = jwt_decode.jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    return <Navigate to="/employer/login" />;
  }

  
  if (decoded.role === "user") {
    return <Navigate to="/user" />;
  }

  
  if (decoded.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return Children;
}


export function AdminPrivateRoutes({Children}) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  const decoded = jwt_decode.jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) { 
    return <Navigate to="/admin/login" />;
  }

  
  if (decoded.role === "user") {
    return <Navigate to="/user" />;
  }

  
  if (decoded.role === "employer") {
    return <Navigate to="/employer" />;
  }

  return Children;
}
