import React from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import BlogsPage from './pages/blogs/Blog';
import BlogsDetailPage from './pages/blogs/BlogsDetail';
import BlogsRootLayout from './pages/blogs/BlogsRootLayout';
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
        path: "blogs",
        element: <BlogsRootLayout />,
        children :[
          {
            index:true,
            element : <BlogsPage />

          },
        {
        path: ":postId",
        element: <BlogsDetailPage />,
        },
        ]
      },
      
    ],
  },
]);