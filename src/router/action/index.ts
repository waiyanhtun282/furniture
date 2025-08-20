import api, { authApi } from "@/api";
import { redirect,ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";

export const loginAction = async({request}:ActionFunctionArgs) =>{
    const formData = await request.formData();
    const authData ={
        phone: formData.get('phone'),
        password: formData.get('password'),
    }


    try {
        
    const response =   await authApi.post('login', authData);
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
}