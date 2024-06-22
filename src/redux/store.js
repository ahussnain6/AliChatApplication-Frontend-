import {configureStore} from "@reduxjs/toolkit";
import { msgSlice } from "./reducer";
const store = configureStore({
    reducer:{
        reducer :msgSlice.reducer,
         
    }
    })
    
    export default store;