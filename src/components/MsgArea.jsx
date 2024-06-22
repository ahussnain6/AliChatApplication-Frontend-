import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/MsgArea.css";
import { BiLogoAws, BiSolidPhone } from "react-icons/bi";
import { IoVideocamSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { io } from "socket.io-client";
import { useGetMsgsQuery, useNewMsgMutation } from "../redux/Api";
import { useDispatch, useSelector } from "react-redux";
import { DelM, User, Editmsg, fetchMessages, PostMsg } from "../redux/reducer";
const MsgArea = () => {
  // const  msgs = useSelector((state)=>state.reducer);
  const navigate = useNavigate();
  const [newMsg] = useNewMsgMutation();
  const dispatch = useDispatch();
  const id = useParams();
  const [right, setRight] = useState([]);
  const [edit, setEdit] = useState(null);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState([]);
  const [pop, setPop] = useState(false);
  const [socket, setSocket] = useState(null);
  const [receiver, setReceiver] = useState([]);
  const userID = localStorage.getItem("userId");
  const [onlin, setOnlin] = useState(false);
  const [info, setinfo] = useState("");
  const getmsginfo = (data) => {
    setinfo(data);
    setPop(true);
  };
  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);
  useEffect(() => {
    socket?.emit("adduser", userID);
    socket?.on("getUsers", (user) => {
      setActive(user);
      getonline(user);
      const use = user.filter((elem) => elem.userID == id.id);
      if (use.length == 1) {
        localStorage.setItem("online", "online");
      } else {
        localStorage.removeItem("online");
      }
    });
  }, [socket]);
  const getonline = () => {
    if (localStorage.getItem("online")) {
      setOnlin(true);
    } else {
      setOnlin(false);
    }
  };
  const handlemsg = async (e) => {
    e.preventDefault();
    const userData = {
      receivername: receiver.username,
      receiverId: receiver._id,
      conversationId: Date.now(),
      senderId: localStorage.getItem("userId"),
      msg: message,
    };
    if (!edit) {
      const response = await dispatch(PostMsg(userData));
      console.log(response);
      setMessage("");
      getmsg();
      setEdit(false);
    }
  };
  const getUser = async () => {
    let response = await dispatch(User(id.id));
    let rec = response.payload[0];
    setReceiver(rec);
    console.log(rec);
    localStorage.setItem("receivername", rec.username);
  };
  const getmsg = async () => {
    let id1 = id.id;
    const response = await dispatch(fetchMessages({ id1, userID }));
    const res = response.payload;
    const respon = [...res].reverse();
    setRight(respon);
  };
  useEffect(() => {
    getUser();
    setPop(false);
  }, [id]);
  useEffect(() => {
    getUser();
    getmsg();
    getonline();
  }, []);
  const DelMsg = async () => {
    const response = await dispatch(DelM(info._id));
    getmsg();
    setPop(false);
  };
  const getvideo = () => {
    navigate(`/videocall/oneonone/${id.id}`);
  };
  const getaudio = () => {
    navigate(`/audiocall/oneonone/${id.id}`);
  };
  const EditMsg = () => {
    setEdit(true);
    setPop(false);
    setMessage(info.msg);
  };
  const handleedit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `https://chat-application-backend-sigma.vercel.app/message/editmsg/${info._id}`,
      { message }
    );
    console.log(response);
    getmsg();
    setEdit(false);
    setMessage("");
  };
  return (
    <>
      <div className="eth">
        <div className="head">
          <div className="h-1">
            <h1 className="h-01">
              {receiver.username ? receiver.username : null}
            </h1>
            {/* <h1 className="h-02">{onlin ? "Online" : "Offline"}</h1> */}
          </div>
          <div className="h-2">
            <IoVideocamSharp className="size" onClick={() => getvideo()} />
            <BiSolidPhone className="size" onClick={() => getaudio()} />
          </div>
        </div>
        <div className="area">
          {pop ? (
            <div className="box">
              <div className="side1">
                <h1 className="h-09">{info.msg}</h1>
              </div>
              <div className="side2">
                <button className="btn-2" onClick={() => DelMsg()}>
                  DELETE
                </button>
                <button className="btn-2" onClick={() => EditMsg()}>
                  EDIT
                </button>
                <button className="btn-2" onClick={() => setPop(false)}>
                  CANCEL
                </button>
              </div>
            </div>
          ) : null}
          {
            // (right.length > 1) ?
            right.map((curElem) => {
              return (
                <>
                  {/* <div className="msg-1"> */}
                  <h4
                    className={`messages ${
                      curElem.senderId == userID ? "right" : "left"
                    }`}
                  >
                    {curElem.msg}{" "}
                    <IoEllipsisVerticalSharp
                      className="c"
                      onClick={() => getmsginfo(curElem)}
                    />{" "}
                  </h4>
                  {/* </div>  */}
                </>
              );
            })
            //:<h1 className='center'>No Messages send and receive via this Contact</h1>
          }
        </div>
        <form onSubmit={edit ? handleedit : handlemsg} className="form-1">
          <input
            type="text"
            id="mes-1"
            placeholder="Enter Your Message..."
            value={message}
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
          <button type="submit" className="btn-1">
            <IoSend />
          </button>
        </form>
      </div>
    </>
  );
};
export default MsgArea;
// https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg
