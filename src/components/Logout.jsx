import React, { useEffect } from 'react'
import {Navigate} from "react-router-dom";
const Logout = () => {
    useEffect(()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("receivername");
    },[])
  return (
    <Navigate to="/" />
  )
}

export default Logout;