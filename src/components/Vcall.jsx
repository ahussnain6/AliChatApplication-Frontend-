import React from 'react'
import { ZIM } from "zego-zim-web";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";
import {useParams,useNavigate, parsePath} from "react-router-dom";
const Vcall = () => {
  const navigate = useNavigate();
    const {id,type} = useParams();
    console.log(id,type);
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("userId");
    const gotomsg =()=>{
      navigate(`/msg/${id}`);
    }
    const mymeeting = (Element)=>{
        const appID = 1009764560;
          const serversecret = "240fcec66d19e387d8056599b44ade26";
          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serversecret,
          "12341234",userID,username);
          const zc = ZegoUIKitPrebuilt.create(kitToken);
zc.addPlugins({ ZIM });
zc.joinRoom({
  container:Element,
  scenario:{
    mode: ZegoUIKitPrebuilt.OneONoneCall,
  },
  showPreJoinView: false,
  preJoinViewConfig: {
    title:"Starting Video Call"
  },
  showRoomTimer: true,
  showLeavingView: false,
  onLeaveRoom:() => gotomsg(),
  turnOnMicrophoneWhenJoining: true,
  turnOnCameraWhenJoining: true,
})}
    const invite =()=>{
      const appID = 1009764560;
      const serversecret = "240fcec66d19e387d8056599b44ade26";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serversecret,
        "12341234",userID,username);
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.sendCallInvitation({
        callees: [{userID:id,userName:'Ali Aka Moeez'}],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        notificationConfig:{
            resourcesID:'zegouikit_call',
            title:'Call invitation',
            message:'Incoming video call...'
        }})
        zc.setCallInvitationConfig({
          enableNotifyWhenAppRunningInBackgroundOrQuit: true,
      })
    }
  return (
    <>
 <div ref={mymeeting} />
  {/* <button onClick={()=>invite()}>Invite</button>  */}
  </>
 )}
export default Vcall;
// const invite=()=>{
//  const targetUser = {userID: data._id,userName: "user_" + 'Ali Hussnain'};
//   const appID = 1009764560;
//   const serversecret = "240fcec66d19e387d8056599b44ade26";
//   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serversecret,
//     userID,Date.now().toString(),"Ali Hussnain");
//   const zc = ZegoUIKitPrebuilt.create(kitToken);
//  zc.sendCallInvitation({
//   callees: [ targetUser ],
//   callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
//   timeout: 60, //Timeout duration (second). 60s by default, range from [1-600s].
//  }).then((res) => {
//   console.warn(res);
//  })
//  .catch((err) => {
//  console.warn(err);
//  });
//  zc.setCallInvitationConfig({
//   enableNotifyWhenAppRunningInBackgroundOrQuit: true,
// })}