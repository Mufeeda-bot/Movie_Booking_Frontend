import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        admin:null
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
        },
        removeUser: (state)=>{
            state.user = null;
        },
        setAdmin: (state, action) => {
            state.admin = action.payload;
          },
          removeAdmin: (state)=>{
            state.admin = null;
        },
    }
});

export const {setUser, removeUser ,setAdmin,removeAdmin} = authSlice.actions

export default authSlice.reducer;