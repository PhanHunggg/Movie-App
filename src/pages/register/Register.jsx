import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/user";
import { setUserAction } from "../../store/actions/userActions";
// import { WrapperForm } from "./loginStyled";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "./register.scss";
import { withViewport } from "../../HOCs/withViewport";
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../../constants";

function Register(device) {
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2100,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const dispatch = useDispatch();

  const [register, setRegister] = useState({
    taiKhoan: "string",
    matKhau: "string",
    email: "string",
    soDt: "string",
    maNhom: "string",
    hoTen: "string",
  });

  const handleChangeRegister = (even) => {
    const { name, value } = even.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    try {
      const result = await registerAPI(register);

      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );

      dispatch(setUserAction(result?.data.content));
      Toast.fire({
        icon: "success",
        title: "Đăng Ký thành công!",
      });

      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: "warning",
        title: error.response.data.content,
      });
      return;
    }
  };
  return (
    <div
      className={`register ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      } ${device === LAPTOP && "laptop"} ${device === DESKTOP && "desktop"}`}
    >
      <div className="form container">
        <form
          className="modal-body"
          onSubmit={handleSubmitRegister}
          style={{ paddingTop: 150, marginLeft: 250, marginRight: 250 }}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Tài Khoản</label>
            <input
              name="taiKhoan"
              type="text"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập tài khoản"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Mật Khẩu</label>
            <input
              name="matKhau"
              // type="password"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              name="email"
              // type="password"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Số điện thoại</label>
            <input
              name="soDt"
              // type="password"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Mã nhóm</label>
            <input
              name="maNhom"
              // type="password"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập mã nhóm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Họ tên</label>
            <input
              name="hoTen"
              // type="password"
              className="form-control"
              onChange={handleChangeRegister}
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="modal-footer">
            <button
              style={{ paddingTop: "10px", width: "100%" }}
              type="submit"
              className="btn btn-success mt-1"
            >
              ĐĂNG KÝ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withViewport(Register);
