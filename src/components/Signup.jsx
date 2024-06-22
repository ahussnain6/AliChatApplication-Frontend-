import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"; 
const Signup = ()=>{
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "", email: "",password: "",  });
  const changeinput = (e) => {
    const name = e.target.name;
    const values = e.target.value;
    setData({ ...data, [name]: values });
  };
  const submitform =(e) => {
      e.preventDefault();
      // const resp = axios.post("http://localhost:5000/user/signup", data);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    fetch('https://chat-application-backend-sigma.vercel.app/user/signup', requestOptions)
        .then(response => response.json())
        .then(data => { 
          console.log(data)
          if(data.token){
            toast.success("SignUP Successfully");
                localStorage.setItem("token",data.token);
                localStorage.setItem("userId",data.id);
                navigate("/profile");
                setData({
                  username: "",
                  email: "",
                  password: "",    
                })   
          }else{
            toast.error(data.extraDetails ? data.extraDetails[0]:data.msg? data.msg:data.message);
          }  });
      }
  return (
    <>
      <h1 className="color-w">SIGNUP PAGE</h1>
      <div className="box1 center">
        <form action="" onSubmit={submitform}>
          <input
            type="text"
            className="input font"
            placeholder="Enter Your Name"
            name="username"
            autoComplete="off"
            onChange={changeinput}
            value={data.username}
          />
          <input
            type="text"
            autoComplete="off"
            className="input font"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={changeinput}
            name="email"
          />
          <input
            type="text"
            placeholder="Enter Your Password"
            autoComplete="off"
            value={data.password}
            className="input font"
            onChange={changeinput}
            name="password"
          />
          <button type="submit" className="btn-19 font">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};
export default Signup;
