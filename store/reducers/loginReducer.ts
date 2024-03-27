import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TAuthOTPVerify, TAuthUser } from './login.extra';


//First loggedIn Gotta be true then we check if it's and otpVerified is false then we proceed to do the OTP Verification 
interface LoginState {
    otpVerified: boolean;
    loggedIn? : boolean;
    loginError: string;
    userName : string;
}

const initialState: LoginState= {
    loggedIn : false,
    loginError: "",
    otpVerified : false,
    userName : ""
}

export const loginSlice= createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {

  },
  extraReducers :(builder) => {
    builder.addCase(TAuthUser.fulfilled,(state,action) => {
        if(action.payload === 200) {
            state.loggedIn = true;            
        }
    }),
    builder.addCase(TAuthUser.rejected,(state) => {
      state.loginError = "Email or Password is incorrect";
    }),
    builder.addCase(TAuthOTPVerify.fulfilled,(state) => {
      state.otpVerified = true;
    })
  }
})
export const loginActions = loginSlice.actions;
