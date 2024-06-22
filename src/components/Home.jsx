import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMsgsQuery } from "../redux/Api";
import { MdLogout } from "react-icons/md";
import { Profiles } from "../redux/reducer";
import { MdGroupAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
const Home = () => {
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Pm-YV8paNxdqWUISIpAKIZCUjYqW_aBSPdbj7RCqvA3YNTN98wI6cSqlgEcjMCRKJEY&usqp=CAU";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState([]);
  const [socket, setSocket] = useState(null);
  const [image, setImage] = useState("");
  // const [active, setActive] = useState([]);
  const [profil, setProfil] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);
  const getprof = async () => {
    let response = await dispatch(Profiles());
    let res = response.payload;
    let user = res && res.filter((element) => element.userId[0]._id !== userId);
    let myId = res && res.filter((elem) => elem.userId[0]._id == userId);
    localStorage.setItem("username", myId && myId[0].userId[0].username);
    console.log("myId", myId && myId[0].userId[0].username);
    setProfil(myId[0]);
    setUsers(user);
  };
  const navigate1 = (id) => {
    navigate(`/groupmsg/${id}`);
  };
  const getGroup = () => {
    let response = axios
      .get("https://chat-application-backend-sigma.vercel.app/group/allgroup")
      .then((response) => {
        // console.log(response.data);
        let mygroups = response.data.res.filter(
          (elem) => elem.adminId == userId
        );
        let mygroup1 = response.data.res.filter((element) =>
          element.groupmembers.includes(userId)
        );
        if (mygroup1.length >= 1 && mygroups.length >= 1) {
          let arr = [mygroup1, mygroups];
          console.log(arr, "allmsg");
          setGroup(arr);
        } else if (mygroup1.length >= 1) {
          setGroup(mygroup1);
        } else {
          setGroup(mygroups);
        }
      });
  };
  const navigat = (Elem) => {
    navigate(`/msg/${Elem.userId[0]._id}`);
  };
  useEffect(() => {
    let id = localStorage.getItem("userId");
    socket?.emit("adduser", id);
    socket?.on("getUsers", (user) => {});
  }, [socket]);
  useEffect(() => {
    getprof();
    getGroup();
    if (!localStorage.getItem("profile")) {
      navigate("/profile");
    }
  }, []);
  return (
    <>
      <h1 className="center-1">ALI-CHATAPP</h1>

      <div className="side">
        <div className="side-1">
          <NavLink to="/creategroup" className="link-22">
            <MdGroupAdd className="logo-23" />
            Create Group
          </NavLink>
          <NavLink to="/myprofile" className="link-22">
            <CgProfile className="logo-23" />
            My Profile
          </NavLink>
          <NavLink to="/logout" className="link-22">
            <MdLogout className="logo-23" />
            Log Out
          </NavLink>
        </div>
        <div className="side-2">
          <h1 className="center">Contacts</h1>
          {users &&
            users.map((curElem) => {
              return (
                <>
                  {" "}
                  <div className="single">
                    <img src={`${curElem.imgurl}`} alt="" className="profile" />
                    <h1
                      onClick={() => navigat(curElem)}
                      className="head-22"
                      style={{ cursor: "pointer" }}
                    >
                      {curElem.userId[0].username}{" "}
                    </h1>{" "}
                  </div>
                  <hr className="line" />{" "}
                </>
              );
            })}
          {group &&
            group.map((elem) => {
              return (
                <>
                  <div className="single">
                    <img src={`${img}`} alt="" className="profile-19" />
                    <h2
                      className="head-22"
                      onClick={() => navigate1(elem._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {elem.Groupname}
                    </h2>
                  </div>
                  <hr className="line" />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Home;
