import React from "react";
import { useRoutes } from "react-router-dom";
import NoAuthGuard from "../guards/NoAuthGuard";
import Home from "../layouts/home/Home";
import Booking from "../pages/booking/Booking";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movie-detail/MovieDetail";
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
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },

        {
          path: "/booking/:showTimeId",
          element: <Booking />,
        },

        {
          path: "/movie-list",
          element: <MovieListPage />,
        },
        {
          path: "/movie-detail/:id",
          element: <MovieDetail />,
        },
      ],
    },
  ]);
  return routing;
}
