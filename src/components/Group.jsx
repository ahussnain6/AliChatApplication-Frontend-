import "./styles/Group.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Profiles } from "../redux/reducer";
import axios from "axios";
const Group = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const [profil, setProfil] = useState([]);
  const userId = localStorage.getItem("userId");
  const getprof = async () => {
    const response = await dispatch(Profiles());
    const res = response.payload;
    const users =
      res && res.filter((element) => element.userId[0]._id !== userId);
    const myId = res && res.filter((elem) => elem.userId[0]._id == userId);
    localStorage.setItem("username", myId && myId[0].userId[0].username);
    // console.log("myId",users);
    setUsers(users);
    // console.log(group,"group");
  };
  useEffect(() => {
    setGroup([]);
    getprof();
  }, []);
  const inputchange = (e) => {
    setGroup([...group, e]);
  };
  const GetVal = async (e) => {
    e.preventDefault();
    const members = [...new Set(group)];
    const groupData = {
      Groupname: value,
      adminId: userId,
      groupmembers: members,
    };
    // console.log(members);
    const res = await axios.post(
      "https://chat-application-backend-sigma.vercel.app/group/creategroup",
      groupData
    );
    console.log(res);
    setGroup([]);
  };
  return (
    <>
      <div className="group-11">
        <div className="group-46">
          <form action="" onSubmit={GetVal}>
            <input
              type="text"
              className="input-66 font"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Group Name"
            />

            <div className="slider">
              {users &&
                users.map((curElem) => {
                  return (
                    <>
                      <div className="dis-77">
                        <label
                          htmlFor={curElem.userId[0].username}
                          className="font font-99"
                        >
                          {curElem.userId[0].username}
                        </label>
                        <input
                          type="checkbox"
                          name=""
                          className="input-87 font"
                          id={curElem.userId[0].username}
                          onChange={() => inputchange(curElem.userId[0]._id)}
                          value={curElem.userId[0].username}
                        />
                      </div>
                    </>
                  );
                })}
            </div>

            <button type="submit" className="btn-d">
              Create Group
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Group;
