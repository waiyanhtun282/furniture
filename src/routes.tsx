import { createBrowserRouter,redirect } from "react-router";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import BlogsPage from './pages/blogs/Blog';
import BlogsDetailPage from './pages/blogs/BlogsDetail';
import BlogsRootLayout from './pages/blogs/BlogsRootLayout';
// const BlogsRootLayout = lazy(() => import("@/pages/blogs/BlogsRootLayout"));
// const BlogsPage = lazy(() => import("@/pages/blogs/Blog"));
// const BlogsDetailPage = lazy(() => import("@/pages/blogs/BlogsDetail"));

import ErrorPage from "./pages/Error";
import ProductsRootLayout from "./pages/products/ProductsRootLayout";
import ProductsPage from "./pages/products/Products";
import ProductsDetailPage from "./pages/products/ProductsDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { homeLoader, loginLoader } from "./router/loader";
import { loginAction, logoutAction } from "./router/action";
// import SuspenseFallback from "./components/SuspenseFallback";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader
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
          // load component and loader in parallel before rendering
          const [ProductsRootLayout] = await Promise.all([
            import("@/pages/products/ProductsRootLayout"),
          ]);
          return { ProductsRootLayout };
        },

        children: [
          {
            index: true,
            Component: ProductsPage,
            //   Component: (
            //     <Suspense fallback={<div className="text-center">loading...</div>}>
            //   <ProductsPage />
            //   </Suspense>
            // ),
            lazy: async () => {
              // load component and loader in parallel before rendering
              const [ProductsPage] = await Promise.all([
                import("@/pages/products/Products"),
              ]);
              return { ProductsPage };
            },
          },
          {
            path: ":productsId",
            Component: ProductsDetailPage,

            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">loading...</div>}
            //   >
            //     <ProductsDetailPage />
            //   </Suspense>
            // ),
            lazy: async () => {
              // load component and loader in parallel before rendering
              const [ProductsDetailPage] = await Promise.all([
                import("@/pages/products/ProductsDetail"),
              ]);
              return { ProductsDetailPage };
            },
          },
        ],
      },
      {
        path: "blogs",
        Component: BlogsRootLayout,
        lazy: async () => {
          // load component and loader in parallel before rendering
          const [BlogsRootLayout] = await Promise.all([
            import("@/pages/blogs/BlogsRootLayout"),
          ]);
          return { BlogsRootLayout };
        },
        // element: (
        //   <Suspense fallback={<div className="text-center">loading...</div>}>
        //     <BlogsRootLayout />
        //   </Suspense>
        // ),
        children: [
          {
            index: true,
            Component: BlogsPage,

            lazy: async () => {
              // load component and loader in parallel before rendering
              const [BlogsPage] = await Promise.all([
                import("@/pages/blogs/Blog"),
              ]);
              return { BlogsPage };
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
            Component: BlogsDetailPage,
            lazy: async () => {
              // load component and loader in parallel before rendering
              const [BlogsDetailPage] = await Promise.all([
                import("@/pages/blogs/BlogsDetail"),
              ]);
              return { BlogsDetailPage };
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
    loader:loginLoader,
    action:loginAction 
    // element: <Login />,
  },
  {
    path: "/register",
    Component: Register,

    // element: <Register />,
  },
  {
    path: "/logout",
    action:logoutAction,
    loader: () => redirect("/"),
  }
]);
