import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
// import BlogsPage from './pages/blogs/Blog';
// import BlogsDetailPage from './pages/blogs/BlogsDetail';
// import BlogsRootLayout from './pages/blogs/BlogsRootLayout';
const BlogsRootLayout = lazy(() => import("@/pages/blogs/BlogsRootLayout"));
const BlogsPage = lazy(() => import("@/pages/blogs/Blog"));
const BlogsDetailPage = lazy(() => import("@/pages/blogs/BlogsDetail"));

import ErrorPage from "./pages/Error";
import ProductsRootLayout from "./pages/products/ProductsRootLayout";
import ProductsPage from "./pages/products/Products";
import ProductsDetailPage from "./pages/products/ProductsDetail";
import Login from "./auth/Login";
import Register from "./auth/Register";
const Suspensefallback = () => <div>loading....</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "products",
        element: <ProductsRootLayout />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ":productsId",
            element: <ProductsDetailPage />,
          },
        ],
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback=fSuspensefallback}>
            <BlogsRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback=fSuspensefallback}>
                <BlogsPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={Suspensefallback}>
                <BlogsDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path:'/login',
    element:<Login/> 
  },
  {
    path:'/register',
    element:<Register />
  }
]);
