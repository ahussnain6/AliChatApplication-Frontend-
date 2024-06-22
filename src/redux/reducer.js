import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const STATUS = Object.freeze({
  IDLE :"IDLE",
  ERROR:"ERROR",
  LOADING:"LOADING"
})
const initialState = {
    status : STATUS.IDLE,  
    msgs:[],
    delresp:[],
    users:[],
    profile:[],
    editmsg:[],
   postmsg:[],
   groups:[]
}
export const msgSlice = createSlice({
    name:"reducer",
   initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMessages.pending,(state,action)=>{
            state.status = STATUS.LOADING;   
        })
        .addCase(fetchMessages.fulfilled,(state,action)=>{
          state.msgs = action.payload;
         state.status = STATUS.IDLE;
        })
        .addCase(fetchMessages.rejected,(state,action)=>{
         state.status = STATUS.ERROR;
        })
        .addCase(DelM.pending,(state,action)=>{
            state.status = STATUS.LOADING;   
        })
        .addCase(DelM.fulfilled,(state,action)=>{
          state.delresp = action.payload;
         state.status = STATUS.IDLE;
        })
        .addCase(DelM.rejected,(state,action)=>{
         state.status = STATUS.ERROR;
        })
        .addCase(User.pending,(state,action)=>{
            state.status = STATUS.LOADING;   
        })
        .addCase(User.fulfilled,(state,action)=>{
          state.users = action.payload;
          // console.log(action.type)
         state.status = STATUS.IDLE;
        })
        .addCase(User.rejected,(state,action)=>{
         state.status = STATUS.ERROR;
        })
        .addCase(Profiles.pending,(state,action)=>{
          state.status = STATUS.LOADING;   
      })
      .addCase(Profiles.fulfilled,(state,action)=>{
        state.profile = action.payload;
        // console.log(action.type)
       state.status = STATUS.IDLE;
      })
      .addCase(Profiles.rejected,(state,action)=>{
       state.status = STATUS.ERROR;
      })
      .addCase(Editmsg.pending,(state,action)=>{
        state.status = STATUS.LOADING;   
    })
    .addCase(Editmsg.fulfilled,(state,action)=>{
      state.editmsg = action.payload;
      // console.log("action",action.payload);
     state.status = STATUS.IDLE;
    })
    .addCase(Editmsg.rejected,(state,action)=>{
     state.status = STATUS.ERROR;
    })
    .addCase(PostMsg.pending,(state,action)=>{
      state.status = STATUS.LOADING;   
  })
  .addCase(PostMsg.fulfilled,(state,action)=>{
    state.postmsg = action.payload;
   state.status = STATUS.IDLE;
  })
  .addCase(PostMsg.rejected,(state,action)=>{
   state.status = STATUS.ERROR;
  })
  .addCase(getGroups.pending,(state,action)=>{
    state.status = STATUS.LOADING;   
})
.addCase(getGroups.fulfilled,(state,action)=>{
  state.groups = action.payload;
 state.status = STATUS.IDLE;
})
.addCase(getGroups.rejected,(state,action)=>{
 state.status = STATUS.ERROR;
})
    }
})  
export default msgSlice.reducer; 
export const fetchMessages = createAsyncThunk("msgs/get", async({id1,userID})=>{
    const response = await axios.get("https://chat-application-backend-sigma.vercel.app/message/getmsg");
    const res = await response.data.response;
    const mymsgs = res.filter(
      (elem) => elem.senderId == userID || elem.receiverId == userID);
    const myactual = mymsgs.filter(
      (elem) => elem.receiverId == id1 || elem.senderId == id1);
   return myactual;
  });
  export const GroupMessages = createAsyncThunk("group/msg",async({groupID,senderId})=>{
    const res = await axios.get("");
  })
  export const DelM = createAsyncThunk("msgs/del",async (id)=>{
    const response = await axios.delete(`https://chat-application-backend-sigma.vercel.app/message/delmsg/${id}`);
    return response;
  }) 
  export const User = createAsyncThunk("users/get",async(id)=>{
    const response = await axios.get("https://chat-application-backend-sigma.vercel.app/misc/users");
    let user = response.data.data;
    const rec = user.filter((elem)=> elem._id == id);
    return rec;});
  export const PostMsg = createAsyncThunk("post/msgs",async(data)=>{
   const response = await axios.post("https://chat-application-backend-sigma.vercel.app/message/msg",data);
   return response;
  })
  export const Profiles = createAsyncThunk("profile/get",async()=>{
    const response = await axios.get("https://chat-application-backend-sigma.vercel.app/misc/profileget");
    const res = await response.data.response;
    return res;
  })
  export const Editmsg = createAsyncThunk("edit/msg",async(id,message)=>{
    const response = await axios.put(`https://chat-application-backend-sigma.vercel.app/message/editmsg/${id}`,{message});
    console.log(response,"response-reducer");
    return response; 
  })
  export const getGroups = createAsyncThunk("get/groups",async(id)=>{
  const response = await axios.get(`https://chat-application-backend-sigma.vercel.app/group/getgroup/${id}`);
  return response; 
  })