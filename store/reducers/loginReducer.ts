import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TAuthOTPVerify, TAuthUser } from './login.extra';
import { local } from '../../locales';


//First loggedIn Gotta be true then we check if it's and otpVerified is false then we proceed to do the OTP Verification 
interface LoginState {
    otpVerified: boolean;
    loggedIn? : boolean;
    loginError: string;
    otpError : string;
    loadingLogin: boolean;
    loadingOTP: boolean;
    userName : string;
}

const initialState: LoginState= {
    loggedIn : false,
    loginError: "",
    otpVerified : false,
    userName : "",
    loadingLogin : false,
    loadingOTP : false,
    otpError : ""
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
    builder.addCase(TAuthUser.pending,(state) => {
      state.loadingLogin = true;
    })
    builder.addCase(TAuthUser.rejected,(state) => {
      state.loginError = local.t("errors.failedLogin");
      state.loadingLogin = false;
    }),
    builder.addCase(TAuthOTPVerify.pending,(state) => {
      state.loadingOTP = true;
    })
    builder.addCase(TAuthOTPVerify.fulfilled,(state) => {
      state.otpVerified = true;
    }),
    builder.addCase(TAuthOTPVerify.rejected,(state) => {
      state.loadingOTP = false;
      state.otpError = local.get("errors.failedOTP")
    })
  }
})
export const loginActions = loginSlice.actions;
