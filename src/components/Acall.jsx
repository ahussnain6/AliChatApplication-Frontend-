import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom";
const Acall = () => {
  const {id,type} = useParams();
  console.log(id,type);
;  const navigate=useNavigate();
  const gotomsg=()=>{navigate(`/msg/${id}`);};
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userId");
  const mymeeting =(Element) => {
    const appID = 1009764560;
    const serversecret = "240fcec66d19e387d8056599b44ade26";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,serversecret, "12341234", userID, username);
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.addPlugins({ ZIM });
    zc.joinRoom({
      container: Element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      preJoinViewConfig: {
        title: "Starting Audio Call",
      },
      showRoomTimer: true,
      showLeavingView: false,
      onLeaveRoom: () => gotomsg(),
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: false,
    });
  };

  return (
    <>
      <div ref={mymeeting} />
    </>
  );
};

export default Acall;
