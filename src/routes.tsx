import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
// const BlogsRootLayout = lazy(() => import("@/pages/blogs/BlogsRootLayout"));
// const BlogsPage = lazy(() => import("@/pages/blogs/Blog"));
// const BlogsDetailPage = lazy(() => import("@/pages/blogs/BlogsDetail"));

import ErrorPage from "@/pages/Error";
import ProductsRootLayout from "@/pages/products/ProductsRootLayout";

import Login from "@/pages/auth/Login";
import AuthRootLayout from "@/pages/auth/AuthRootLayout";
import SingUpPage from "@/pages/auth/SingUp";
import {
  blogInfiniteLoader,
  confirmPasswordLoader,
  homeLoader,
  loginLoader,
  newPasswordLoader,
  otpLoader,
  postLoader,
  productInfiniteLoader,
  productLoader,
  verifyLoader,
} from "@/router/loader";
import {
  confirmPasswordAction,
  // favouriteAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  otpAction,
  registerAction,
  resetAction,
  verifyAction,
} from "@/router/action";
import OtpPage from "@/pages/auth/Otp";
import ConfirmPasswordPage from "@/pages/auth/ConfirmPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtpPage from "@/pages/auth/Verify";
import NewPasswordPage from "@/pages/auth/NewPassword";
// import SuspenseFallback from "./components/SuspenseFallback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "products",
        Component: ProductsRootLayout,
        // <Suspense fallback={<div className="text-center">loading...</div>}>
        //   <ProductsRootLayout />
        // </Suspense>
        lazy: async () => {
          const module = await import("@/pages/products/ProductsRootLayout");
          return { Component: module.default };
        },

        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("@/pages/products/Products");
              return {
                Component: module.default,
                loader: productInfiniteLoader,
              };
            },
          },
          {
            path: ":productId",
            lazy: async () => {
              const module = await import("@/pages/products/ProductsDetail");
              return {
                Component: module.default,
                loader: productLoader,
                // action: favouriteAction
              };
            },
          },
        ],
      },
      {
        path: "blogs",
        lazy: async () => {
          const module = await import("@/pages/blogs/BlogsRootLayout");
          return { Component: module.default, loader: blogInfiniteLoader };
        },
        // element: (
        //   <Suspense fallback={<div className="text-center">loading...</div>}>
        //     <BlogsRootLayout />
        //   </Suspense>
        // ),
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("@/pages/blogs/Blog");
              return { Component: module.default };
            },

            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">loading...</div>}
            //   >
            //     <BlogsPage />
            //   </Suspense>
            // ),
          },
          {
            path: ":postId",
            lazy: async () => {
              const module = await import("@/pages/blogs/BlogsDetail");
              return { Component: module.default, loader: postLoader };
            },

            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">loading...</div>}
            //   >
            //     <BlogsDetailPage />
            //   </Suspense>
            // ),
          },
        ],
      },
      {
        path: "*",
        Component: ErrorPage,
        // element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    loader: loginLoader,
    action: loginAction,
    // element: <Login />,
  },
  {
    path: "/register",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: SingUpPage,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        Component: OtpPage,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        Component: ConfirmPasswordPage,
        loader: confirmPasswordLoader,
        action: confirmPasswordAction,
      },
    ],

    // element: <Register />,
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
  {
    path: "/reset",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: ResetPasswordPage,
        action: resetAction,
      },
      {
        path: "verify",
        Component: VerifyOtpPage,
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        Component: NewPasswordPage,
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
