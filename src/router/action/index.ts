import api, { authApi } from "@/api";
import { redirect,ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";

export const loginAction = async({request}:ActionFunctionArgs) =>{
    const formData = await request.formData();
    const credentials =Object.fromEntries(formData);
    // const authData ={
    //     phone: formData.get('phone'),
    //     password: formData.get('password'),
    // }


    try {
        
    const response =   await authApi.post('login', credentials);
    if(response.status !== 200) {
        return {error:response.data || 'Login failed. Please try again.'};
    }
       return redirect('/');

    } catch (error) {
        if(error instanceof AxiosError) {
            return {error: error.response?.data || 'Login failed. Please try again.'};
        }else throw error;
    }
}

export const logoutAction = async() => {
    try {
         await api.post('logout');
         return redirect('/login');
    } catch (error) {
        console.log("Error during logout:", error);
        
    }
};


export const registerAction = async({request}:ActionFunctionArgs) =>{
    const formData = await request.formData();
    const credentials =Object.fromEntries(formData);
    // const authData ={
    //     phone: formData.get('phone'),
    //     password: formData.get('password'),
    // }


    try {
        
    const response =   await authApi.post('register', credentials);
    if(response.status !== 200) {
        return {error:response.data || 'Sending OTP failed. !'};
    }
       return redirect('/register/otp');


    //    client state managment
    // memory -context,redux ,zustand

    } catch (error) {
        if(error instanceof AxiosError) {
            return {
              error:
                error.response?.data || "Sending OTP failed. Please try again.",
            };
        }else throw error;
    }
}