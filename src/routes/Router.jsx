import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../layouts/home/Home";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return routing;
}
