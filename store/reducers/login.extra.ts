import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { CONSTANTS } from "../../constants"

export const TAuthUser = createAsyncThunk(
    'users/auth',
    async (data: { email: string, password: string }) => {
        const response = await axios.post(`${CONSTANTS.BASE_URL}auth/login`, {
            email: data.email,
            password: data.password
        });
        return response.status;
    },
)
export const TAuthOTPVerify= createAsyncThunk(
    'users/otp',
    async (data: {email : string,code: string}) => {
        const response = await axios.post(`${CONSTANTS.BASE_URL}auth/verify-login`, {
            email: data.email,
            code: data.code
        });
        console.log("OTP Correct");
        return response.status;
    },
)