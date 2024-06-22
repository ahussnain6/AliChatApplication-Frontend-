import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom";
import { BiSolidPhone } from "react-icons/bi";
import { IoVideocamSharp } from "react-icons/io5";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { getGroups } from '../redux/reducer';
const Groupmsg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id}= useParams();
  const [allmsg,setAllMsg] = useState([]);
  const [pop, setPop] = useState(false);
  const [message, setMessage] = useState("");
  const [edit,setEdit] = useState(null);
  const [right,setRight] = useState([]);
   const [group,setGroup] = useState([]);
   const [info, setinfo] = useState("");
   const myID =  localStorage.getItem("userId"); 
   const myname = localStorage.getItem("username");
  const getmsginfo = (data) => {
    setinfo(data);
    // console.log(data);
    setPop(true);
  };
  const handlegmsg =async(e)=>{
    e.preventDefault();
    const messages ={
    receiverId:group.groupmembers,
    GroupId:id,
    sendername:myname,
    senderId:myID,
    msg:message}
   const response = await axios.post(
     `https://chat-application-backend-sigma.vercel.app/group/sendgmsg`,
     { message });
                 console.log("message",response);
                getmsg();
                }
  const handlegedit =async(e)=>{
   e.preventDefault();
   const response = await axios.put(
    `https://chat-application-backend-sigma.vercel.app/group/editgmsg/${info._id}`,{ message });
  console.log(response);
  getmsg();
  setEdit(false);
  }
  const DelMsg =async()=>{ 
   const response = await axios.delete(`https://chat-application-backend-sigma.vercel.app/group/delgmsg/${info._id}`);
   console.log(response);
   getmsg();
   setPop(false);
  }
    const getData =()=>{
     const data = dispatch(getGroups(id)).then((resp)=>{
      setGroup(resp.payload.data.res)
    }); }
    const getvideo =()=>{navigate(`/videocall/group/${id}`);}
    const getaudio =()=>{navigate(`/audiocall/group/${id}`);}
      const getmsg = async () => {
        const response = await axios.get("https://chat-application-backend-sigma.vercel.app/group/getgmsg");
        const res = response.data.res;
const mymsgs = res.filter((elem)=> elem.GroupId == id && elem.receiverId.includes(myID) || elem.senderId == myID 
 );
        const respon = [...mymsgs].reverse();        
        setRight(respon);
      };
    const EditMsg =()=>{setEdit(true);setPop(false);setMessage(info.msg);};
    useEffect(()=>{
      getmsg();
      setPop(false);
        getData();},[id])
  return (
    <>
    <div className="eth">
    <div className="head">
      <div className="h-1">
        <h1 className="h-01">
          {group.Groupname ? group.Groupname: null}
        </h1>
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
        (right.length > 1) ?
       right && right.map((curElem) => {
          return (
            <>
               {/* <div className="msg-1"> */}
               {   curElem.senderId == myID ?
               <h4 className="messages right" >
                   {curElem.msg}
                <IoEllipsisVerticalSharp className="c" onClick={() => getmsginfo(curElem)} />
              </h4>: <h4 className="messages left">
                {curElem.sendername} : { curElem.msg}
              <IoEllipsisVerticalSharp className="c" onClick={()=> getmsginfo(curElem)} />
            </h4>
               }
      {/* //         </div>  */}
           </>
          );
        })
        :<h1 className='center'>No Messages send and receive via this Group</h1>
      }
    </div>
    <form onSubmit={edit ? handlegedit : handlegmsg} className="form-1">
      <input
        type="text"
        id="mes-1"
        placeholder="Enter Your Message...."
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
  )
}

export default Groupmsg;