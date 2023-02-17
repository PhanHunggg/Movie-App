import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default function AuthGuard() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.userReducer);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    if (!state.userInfo) {
      navigate("/login");

      Toast.fire({
        icon: "success",
        title: "Đăng nhập để tiếp tục đặt vé",
      });
    }
  }, []);
  return <Outlet />;
}
