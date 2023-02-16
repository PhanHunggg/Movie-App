import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function NoAuthGuard() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (state.userInfo) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
}
