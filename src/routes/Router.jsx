import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../layouts/home/Home";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import MovieListPage from "../pages/movie-list/MovieListPage";

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

        {
          path: "/movie-list",
          element: <MovieListPage />,
        },
      ],
    },
  ]);
  return routing;
}
