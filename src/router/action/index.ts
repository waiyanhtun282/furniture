import api, { authApi } from "@/api";
import { redirect,ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";
import {  Status, useAuthStore } from "@/store/authStore";

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
    const authStore = useAuthStore.getState();
    const formData = await request.formData();
    const credentials =Object.fromEntries(formData);
    // const authData ={
    //     phone: formData.get('phone'),
    //     password: formData.get('password'),
    // }


    try {
      const response = await authApi.post("register", credentials);
      if (response.status !== 200) {
        return { error: response.data || "Sending OTP failed. !" };
      }

      //    client state managment
      // memory -context,redux ,zustand
      authStore.setAuth(response.data.phone, response.data.token, Status.otp);

      return redirect("/register/otp");
    } catch (error) {
        if(error instanceof AxiosError) {
            return {
              error:
                error.response?.data || "Sending OTP failed. Please try again.",
            };
        }else throw error;
    }
};


export const otpAction = async({request}:ActionFunctionArgs) =>{
    const authStore = useAuthStore.getState();
    const formData = await request.formData();
    const credentials = {
        phone: authStore.phone,
        otp: formData.get('otp'),
        token:authStore.token
    };

     try {
       const response = await authApi.post("verify-otp", credentials);
       if (response.status !== 200) {
         return { error: response.data || "Verify OTP failed. !" };
       }

       //    client state managment
       // memory -context,redux ,zustand
       authStore.setAuth(response.data.phone, response.data.token, Status.conifrm);

       return redirect("/register/confirm-password");
     } catch (error) {
       if (error instanceof AxiosError) {
         return {
           error:
             error.response?.data || "Verify OTP failed. Please try again.",
         };
       } else throw error;
     }
}

export const confirmPasswordAction = async({request}:ActionFunctionArgs) =>{
    const authStore = useAuthStore.getState();
    const formData = await request.formData();
    const credentials = {
        phone: authStore.phone,
        password: formData.get('password'),
        token:authStore.token
    };

     try {
       const response = await authApi.post("confirm-password", credentials);
       if (response.status !== 201) {
         return { error: response.data || "Registeration  failed. !" };
       }

       //    client state managment
       // memory -context,redux ,zustand
       authStore.clearAuth();

       return redirect("/");
     } catch (error) {
       if (error instanceof AxiosError) {
         return {
           error:
             error.response?.data || "Registeration failed. Please try again.",
         };
       } else throw error;
     }
}