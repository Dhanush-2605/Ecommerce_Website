
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user", 
    initialState: {
      currentUser:null,
      isFetching: false,
      navImage:"",
      error: false,
    },
    reducers: {
        loginStart:(state)=>{
            state.isFetching=true;

        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
           

        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logoutUser:(state)=>{
            state.currentUser=null;
        },
        setNavImage:(state,action)=>{
            state.navImage=action.payload

        }

    },
  });

export const {loginStart,loginFailure,loginSuccess,logoutUser,setNavImage}=userSlice.actions;
export default userSlice.reducer;