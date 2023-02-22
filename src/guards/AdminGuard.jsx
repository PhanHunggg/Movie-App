import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminGuard() {
  const adminState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminState.userInfo) {
      notification.warning({
        message: "Vui lòng đăng nhập!",
      });
      navigate("/");
      return;
    } else if (adminState.userInfo.maLoaiNguoiDung === "KhachHang") {
      notification.warning({
        message: "Bạn không thể truy cập!",
      });

      navigate("/");

      return;
    }

  }, []);

  return <Outlet />;
}
