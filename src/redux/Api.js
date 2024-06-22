import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const messages = createApi({
    reducerPath:"messages",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:5000/user/",
    }),
    tagTypes:["msg"],
    endpoints:(builder)=>({
        getMsgs: builder.query({query:()=>"getmsg",
        providesTags:["msg"]
    }),
        newMsg: builder.mutation({
            query:(post)=>({
            url:"msg",
            method:"POST",
            body:post
            }),
            invalidatesTags:["msg"]
    })
    })
});
export const {useGetMsgsQuery,useNewMsgMutation} = messages;