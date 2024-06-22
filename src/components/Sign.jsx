import React, { useEffect, useState } from 'react'
import "./styles/Sign.css";
import Signup from './Signup';
import Signin from './Signin';
import { useNavigate} from "react-router-dom";
const Sign = () => {
const navigate = useNavigate();
  const [signup,setSignup] = useState(true);
  useEffect(()=>{
      if(localStorage.getItem("token")){
       navigate("/home");
      }
  },[])
  return (
    <>
     <div className="main-1">
      <h1 className="head-1">CHAT APPLICATION</h1>
    <div className="signup center">
     {(signup)?(
    <>
     <Signup />
     <h2 className="margin-1" onClick={()=>setSignup(!signup)} >Already Have Account,let's Sign In</h2>
     </> 
    ):(
     <>
          <Signin  />
     <h2 className="margin-1"  onClick={()=>setSignup(!signup)} >Dont' Have Account,let's Sign Up</h2>
     
     </>
     )}
    </div>
    </div>
    </>
  )
}

export default Sign;