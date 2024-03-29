import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/user";
import { setUserAction } from "../../store/actions/userActions";
import { WrapperForm } from "./loginStyled";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../../constants";
import "./login.scss";
import { withViewport } from "../../HOCs/withViewport";
import { LoadingContext } from "../../contexts/loading/LoadingContext";

function Login({ device }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [_, setLoadingState] = useContext(LoadingContext);

  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/register");
  };

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (even) => {
    const { name, value } = even.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
  
    setLoadingState({ isLoading: false });
  
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await loginApi(form);

      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );

      dispatch(setUserAction(result?.data.content));
      Toast.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
      });

      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: "warning",
        title: "Tài khoản hoặc mật khẩu không đúng!",
      });
      return;
    }
  };

  return (
    <div
      className={`form-all ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      } ${device === LAPTOP && "laptop"} ${device === DESKTOP && "desktop"}`}
    >
      <div className="container">
        <div
          className="row"
          style={{ paddingTop: "175px", paddingBottom: "50px" }}
        >
          <div className="col-12 col-lg-6 form-login">
            <WrapperForm className="form">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group inputBox">
                  <input
                    placeholder=" "
                    onChange={handleChange}
                    name="taiKhoan"
                    type="text"
                    className="form-control form-input"
                  />
                  <label className="form-label">Tài Khoản</label>
                </div>
                <div className="form-group inputBox">
                  <input
                    placeholder=" "
                    onChange={handleChange}
                    name="matKhau"
                    type="password"
                    className="form-control form-input"
                  />
                  <label className="form-label">Mật khẩu</label>
                </div>
                <div className="button_submit text-center">
                  <button
                    style={{ paddingTop: "10px", width: "100%" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    ĐĂNG NHẬP
                  </button>
                  <hr />
                </div>
              </form>
              <button
                style={{ paddingTop: "10px", width: "100%" }}
                type="submit"
                className="btn btn-success mt-1"
                onClick={navigateRegister}
              >
                ĐĂNG KÝ
              </button>
            </WrapperForm>
          </div>
          <div className="col-lg-6 login-text">
            <h2 style={{ fontFamily: "'Merriweather', serif" }}>
              Chào mừng bạn đến với Cybersoft Cinema!
            </h2>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Hãy cùng bạn bè và gia đình khám phá thế giới movie tại
              <span style={{ color: "#FFC72C" }}> Cybersoft Cinema</span>
            </p>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Chúc bạn có những trải nghiệm vui vẻ khi xem phim tại rạp !!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withViewport(Login);
