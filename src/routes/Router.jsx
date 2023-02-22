import React from "react";
import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/AdminGuard";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import AdminLayout from "../layouts/admin/Admin";
import Home from "../layouts/home/Home";
import Booking from "../pages/booking/Booking";

import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movie-detail/MovieDetail";
import MovieForm from "../pages/movie-form/MovieForm";
import MovieListPage from "../pages/movie-list/MovieListPage";
import MovieManagement from "../pages/movieManagement/MovieManagement";

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
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:showTimeId",
              element: <Booking />,
            },
          ],
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
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/movie-management/add-movie",
              element: <MovieForm />,
            },
            {
              path: "/admin/movie-management/edit/:id",
              element: <MovieForm />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
