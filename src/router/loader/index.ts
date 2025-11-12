import { LoaderFunctionArgs, redirect } from "react-router";
import { authApi } from "@/api/index";
import {
  categoryTypeQuery,
  onePostQuery,
  oneProductQuery,
  postsInfiniteQuery,
  postsQuery,
  productsInfiniteQuery,
  productsQuery,
  queryClient,
} from "@/api/query";
import { Status, useAuthStore } from "@/store/authStore";
// import { homeLoader } from './index';

// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");

//     return { productsData : products.data, postsData: posts.data};
//   } catch (error) {
//     console.log("HomeLoader error:", error);
//   }
// };
export const homeLoader = async () => {
  await queryClient.ensureQueryData(productsQuery("?limit=8"));
  await queryClient.ensureQueryData(postsQuery("?limit=3"));
  return null;
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

export const blogInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postsInfiniteQuery());
  return null;
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("Post ID is required");
  }
  await queryClient.ensureQueryData(postsQuery("?limit=6"));
  await queryClient.ensureQueryData(onePostQuery(Number(params.postId)));
  return { postId: params.postId };
};

export const productInfiniteLoader = async () => {
  await queryClient.ensureQueryData(categoryTypeQuery());
  await queryClient.prefetchInfiniteQuery(productsInfiniteQuery());
  return null;
};

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.productId) {
    throw new Error("No Product ID provided");
  }

  await queryClient.ensureQueryData(productsQuery("?limit=4"));
  await queryClient.ensureQueryData(oneProductQuery(Number(params.productId)));
  // console.log(params.productId)
  return { productId : params.productId };
};

// export const productLoader = async ({ params }: LoaderFunctionArgs) => {
//   const id = Number(params.productId);

//   if (!id || isNaN(id)) {
//     throw new Response("Invalid Product ID", { status: 400 });
//   }

//   await queryClient.ensureQueryData(productsQuery("?limit=4"));
//   await queryClient.ensureQueryData(oneProductQuery(id));

//   return { productId: id };
// };