import {create} from 'zustand';
import  { immer } from 'zustand/middleware/immer';
import { persist ,createJSONStorage} from 'zustand/middleware';


export enum Status {
    otp ="otp",
    conifrm = "confirm",
    verify ="verify",
    reset ="reset",
    none ="none"
};

type State ={
    phone:string | null;
    token:string | null;
    status:Status.none;
};

const initialState:State = {
    phone:null,
    token:null,
    status:Status.none
};

type Actions ={
    setAuth :(phone:string, token:string ,status:Status) =>void;
    clearAuth:() =>void;
}

export const authStore =create(
    ...initialState,
)