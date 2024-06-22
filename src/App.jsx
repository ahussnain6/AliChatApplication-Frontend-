import "./App.css";
import Profilepic from "./components/Profilepic";
import Sign from "./components/Sign";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import Homepage from "./components/styles/Homepage";
import Home from "./components/Home";
import MsgArea from "./components/MsgArea";
import Vcall from "./components/Vcall";
import Acall from "./components/Acall";
import Group from "./components/Group";
import Groupmsg from "./components/Groupmsg";
import MyProfile from "./components/MyProfile";
import Logout from "./components/Logout";
function App() {
  return (
    <>
     <Router>
      <Routes>     
        <Route path="/" element={<Sign />} />
        <Route path="/Profile" element={<Profilepic />} />
        <Route path="/home" element={<Home />} />
        <Route path="/videocall/:type/:id" element={<Vcall />} />
        <Route path="/msg/:id" element={<MsgArea />} />
        <Route path="/audiocall/:type/:id" element={<Acall />} />
        <Route path="/creategroup" element={<Group />}  />
        <Route path="/groupmsg/:id" element={<Groupmsg />}  />
        <Route path="/logout" element={<Logout />}  />
        <Route path="/myprofile" element={<MyProfile />}  />
      </Routes>
     </Router>
    </>
  );
}

export default App;
