import api, { authApi } from "@/api/index";
import { Status, useAuthStore } from "@/store/authStore";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const products = await api.get("users/products?limit=8");
    const posts = await api.get("users/posts/infinite?limit=3");

    return { productsData : products.data, postsData: posts.data};
  } catch (error) {
    console.log("HomeLoader error:", error);
  }
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("LoginLoader error:", error);
  }
};

export const otpLoader = async () => {
  const authSore = useAuthStore.getState();

  if (authSore.status !== Status.otp) {
    return redirect("/reigster");
  }
  return null;
};

export const confirmPasswordLoader = async () => {
  const authSore = useAuthStore.getState();

  if (authSore.status !== Status.conifrm) {
    return redirect("/register");
  }
  return null;
};

//1. login success -->loader(fetching data) -->Home screen
//2 login success -->Home screen -->useQusery (cache after fetching data)
//3. login success -->loader (cache after fetching data) --.Home screen
