import {useState,useEffect} from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { Profiles } from '../redux/reducer';
import "./styles/MyProfile.css";
const MyProfile = () => {
    const dispatch = useDispatch();
    const [profil, setProfil] = useState([]);
    const [image, setImage] = useState("");
    const userId = localStorage.getItem("userId");
    const getprof = async ()=>{
        let response = await dispatch(Profiles());
        let res = response.payload;
        let myId = res && res.filter((elem) => elem.userId[0]._id == userId);
        localStorage.setItem("username", myId && myId[0].userId[0].username);
        console.log("myId",myId && myId[0].userId[0].username);
        setProfil(myId[0]);
      };
      const submitForm = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("file", image);
        data.append("folder", "carshop1");
        data.append("upload_preset", "carshop");
        data.append("cloud_name", "dlcyf2qtl");
        data.append("api_key", `358396761568598`);
        data.append("api_secret", `9uJDlY1h2_nM1GjJ48H7BihkTHg`);
        let res = await fetch(
          `https://api.cloudinary.com/v1_1/dlcyf2qtl/image/upload`,
          { method: "POST", body: data }
        );
        let response = await res.json();
        let Url = response.secure_url;
        if (Url) {
          let respon = axios
            .put(`https://chat-application-backend-sigma.vercel.app/user/editprofile/${profil._id}`, { Url })
            .then((response) => {
              localStorage.setItem("profile", "ok");
              getprof();
            });
        }
      };
      const getImage = (e) => {
        setImage(e.target.files[0]);
      };
      useEffect(() => {
        getprof();
        if (!localStorage.getItem("profile")) {
          navigate("/profile");
        }
      }, []);
  return (
    <>
    <div className="profile-23">

    <h1 className="center-2">Profile</h1>
          <img
            src={`${profil.imgurl}`}
            alt="imageprofile"
            className="profile-9 font"
          />
          <form action="" onSubmit={submitForm} className='form-t'>
            <label htmlFor="file-upload" class="custom-file-upload font">
              Change Profile Picture
            </label>
            <input
              type="file"
              id="file-upload"
              className="filename"
              accept="image/*"
              onChange={getImage}
            />
            <br />
            <button className="btn-15">Upload</button>
          </form>
          <h1 className='font margin-3'>{profil.userId ? profil.userId[0].username : "You"}</h1>
          <h1 className='font margin-3'>{profil.userId ? profil.userId[0].email : "You"}</h1>

          </div>

    
    
    </>
  )
}

export default MyProfile;