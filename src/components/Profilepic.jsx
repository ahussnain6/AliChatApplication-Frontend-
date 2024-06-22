import React, { useEffect, useState } from "react";
import "./styles/Profilepic.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast }from "react-toastify";
const Profilepic = () => {
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const getImage = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file",image);
    data.append("folder","carshop1");
    data.append("upload_preset","carshop");
    data.append("cloud_name","dlcyf2qtl");
    data.append("api_key",`358396761568598`);
    data.append("api_secret",`9uJDlY1h2_nM1GjJ48H7BihkTHg`);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dlcyf2qtl/image/upload`, data);
    const response = res.data;
    const token = localStorage.getItem("token");
    if (token && response.secure_url) {
      const newData = {
        imgurl: response.secure_url,
        userId: localStorage.getItem("userId"),
      };
      const respon = axios
        .post("https://chat-application-backend-sigma.vercel.app/user/profilepic", newData)
        .then((response) => {
          localStorage.setItem("profile", "ok");
        });
      navigate("/home");
    } else {
      toast.error("Invalid Picture");
      navigate("/profile");
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("userId") && localStorage.getItem("profile")){
      navigate("/home")
    }
    if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
      navigate("/");
      toast.error("Kindly Enter Your Details");
    } else {
      navigate("/profile");
    }
  }, []);
  return (
    <>
      <div className="main-1">
        <h1 className="head-1">CHAT APPLICATION</h1>
        <form action="" onSubmit={submitForm}>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="file-upload"
            className="filename"
            accept="image/*"
            onChange={getImage}
          />
          <button className="btn-11">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Profilepic;
