import { Image, KeyboardAvoidingView, View } from "react-native";
import { style } from "./styles";
import { Button, Text } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm } from "react-hook-form";
import { TextInputField } from "../../components/form/input";
import { yupResolver } from '@hookform/resolvers/yup';

import logo from "./../../assets/logo.png";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { TAuthOTPVerify, TAuthUser } from "../../store/reducers/login.extra";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { useEffect, useState } from "react";


const validationObject = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(1)
})
const otpValidationObject= yup.object({
    otp: yup.string().email().required().min(6),
})

type loginState = "LoginInfo" | "OTPInfo" | "LoggedIn";

export const LoginScreen = () => {
    const form = useForm<{ email: string, password: string }>({ resolver: yupResolver(validationObject) as any, mode: "onChange" });
    const otpForm = useForm<{ otp : string}>({ resolver: yupResolver(otpValidationObject) as any, mode: "onChange" });
    const authState = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();
    const [currentLoginState, setCurrentLoginState] = useState<loginState>("LoginInfo");

    useEffect(() => {
        if (authState.loggedIn && !authState.otpVerified) {
            setCurrentLoginState("OTPInfo");
        }
    }, [authState.loggedIn, authState.otpVerified]);
    return (
        <View style={style.containerStyle}>
            <LinearGradient colors={['#1494B8', '#0C4358']} style={style.containerStyle}>
                <Image source={logo} style={{ width: 300, height: 100 }} />
                <KeyboardAvoidingView style={{ width: "80%", alignItems: "center", paddingVertical: 20, justifyContent: "center", paddingHorizontal: 10, backgroundColor: "white", borderRadius: 10 }}>
                    <Text style={{ fontSize: 22, marginBottom: 30, textAlign: "center" }}>تسجيل الدخول</Text>
                    {currentLoginState === "LoginInfo" && (
                        <>
                            <TextInputField mode="outlined" style={style.inputStyle} label={"البريد الالكتروني"} control={form.control} name="email" />
                            <TextInputField mode="outlined" style={style.inputStyle} label={"كلمة المرور"} control={form.control} name="password" />
                            <Button  mode="outlined" onPress={async () => {
                                if (await form.trigger()) {
                                    dispatch(TAuthUser(form.getValues()))
                                }
                            }}>تسجيل الدخول</Button>
                        </>
                    )}
                    {currentLoginState === "OTPInfo" && (
                        <>
                            <TextInputField mode="outlined" style={style.inputStyle} label={"رمز التحقق"} control={otpForm.control} name="otp" />
                            <Button  mode="outlined" onPress={async () => {
                                if (await form.trigger()) {
                                    dispatch(TAuthOTPVerify({email : form.getValues().email,code : otpForm.getValues().otp}))
                                }
                            }}>ارسال</Button>
                        </>
                    )}
                </KeyboardAvoidingView>
            </LinearGradient>
        </View>
    )
}