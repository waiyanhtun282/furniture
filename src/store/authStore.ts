import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export enum Status {
  otp = "otp",
  conifrm = "confirm",
  verify = "verify",
  reset = "reset",
  none = "none",
}

type State = {
  phone: string | null;
  token: string | null;
  status: Status;
};

const initialState: State = {
  phone: null,
  token: null,
  status: Status.none,
};

type Actions = {
  setAuth: (phone: string, token: string, status: Status) => void;
  clearAuth: () => void;
};

 export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (phone, token, status) =>
        set((state) => {
          state.phone=phone;
          state.token=token;
          state.status=status;
        }),

      clearAuth: () => set(initialState),
    })),
    {
      name: "auth-credentials", // key fot session storage 
      storage: createJSONStorage(() => sessionStorage), // use session storage
    }
  )
);
