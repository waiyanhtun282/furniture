import { createBrowserRouter } from 'react-router'
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import BlogsPage from './pages/blogs/Blog';
import BlogsDetailPage from './pages/blogs/BlogsDetail';
import BlogsRootLayout from './pages/blogs/BlogsRootLayout';
import ErrorPage from './pages/Error';
import ProductsRootLayout from './pages/products/ProductsRootLayout';
import ProductsPage from './pages/products/Products';
import ProductsDetailPage from './pages/products/ProductsDetail';

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
        element: <BlogsRootLayout />,
        children: [
          {
            index: true,
            element: <BlogsPage />,
          },
          {
            path: ":postId",
            element: <BlogsDetailPage />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);