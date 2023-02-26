import React from "react";
import { useRoutes } from "react-router-dom";
import AdminGuard from "../guards/AdminGuard";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import AdminLayout from "../layouts/admin/Admin";
import Home from "../layouts/home/Home";
import Booking from "../pages/booking/Booking";

import HomePage from "../pages/home/HomePage";
import UserForm from "../pages/home/user-form/UserForm";
import Login from "../pages/login/Login";
import MovieShowtime from "../pages/login/movie-showtime/MovieShowtime";
import MovieDetail from "../pages/movie-detail/MovieDetail";
import MovieForm from "../pages/movie-form/MovieForm";
import MovieListHotPage from "../pages/movie-list/MovieListHotPage";
import MovieListPage from "../pages/movie-list/MovieListPage";
import MovieManagement from "../pages/movieManagement/MovieManagement";
import Register from "../pages/register/Register";
import UserManagement from "../pages/user-management/UserManagement";

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
          path: "/register",
          element: <Register />,
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
          path: "/movie-list-hot",
          element: <MovieListHotPage />,
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
            {
              path: "/admin/movie-management/showtime/:id",
              element: <MovieShowtime />,
            },
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
            {
              path: "/admin/user-management/add-user",
              element: <UserForm />,
            },
            {
              path: "/admin/user-management/edit-user/:user",
              element: <UserForm />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
