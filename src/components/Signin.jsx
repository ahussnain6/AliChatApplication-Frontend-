import React,{useState,useEffect} from 'react';
import axios from "axios";
import {useDispatch,useSelector} from "react-redux" 
import { useNavigate} from "react-router-dom";
import { Profiles } from '../redux/reducer';
import {toast} from "react-toastify";
const Signin = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id,setID] = useState("");
    const [data, setData] = useState({
      email: "",
      password: "",
    });
    const changeinput = (e) => {
      const name = e.target.name;
      const values = e.target.value;
      setData({ ...data, [name]: values });
    };
    const submitform = (e) => {
      e.preventDefault();
      const res = axios.post("https://chat-application-backend-sigma.vercel.app/user/login", data)
      .then((response) => {
        const res = response.data;
        console.log(res);
        if(res.id){
         toast.success("Login Successfully");    
        setID(res.id);
        localStorage.setItem("userId",res.id);
        localStorage.setItem("token",res.token);
        let Dispatching = dispatch(Profiles()).then((resp)=>{
         const response1 = resp.payload.filter((elem)=>elem.userId[0]._id == res.id);
         if(response1 && response1.length == 1){
          localStorage.setItem("profile","ok");
          navigate("/home");
         }else{
          navigate("/Profile");
         } 
  })
    }else{
      toast.error(res.msg);
    }    
    })
    };
  return (
    <>
    <h1 className="color-w">SIGN-IN PAGE</h1>
    <div className="box1 center">
      <form action="" onSubmit={submitform}>
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
          SignIn
        </button>
      </form>
    </div>
    </>

  )
}

export default Signin;