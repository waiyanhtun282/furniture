import React from 'react'
import { createBrowserRouter } from 'react-router'
import RootLayout from './pages/RootLayout';
import HomePage from './pages/Home';
import ContactPage from './pages/Contact';
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
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);