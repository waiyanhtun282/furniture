import api, { authApi } from '@/api/index';
import { Status, useAuthStore } from '@/store/authStore';
import { redirect } from 'react-router';

export const homeLoader = async () => {
    try {
        const response = await api.get("users/products");
        return response.data;
        
    } catch (error) {
        console.log('HomeLoader error:', error);
    }
};

export const loginLoader = async () =>{
try {
        const response = await authApi.get("auth-check");
        if(response.status !== 200){
            return null
        }
        return redirect('/');
        
    } catch (error) {
        console.log('LoginLoader error:', error);
    }
}

export const otpLoader = async () =>{
const authSore = useAuthStore.getState();

if(authSore.status !== Status.otp  ){
    return redirect('/reigster');
};
return null;
}