import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserAction } from "../../store/actions/userActions";
import { WrapperInput } from "./headerStyled";
import "./header.scss";

export default function Header() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserAction(null));

    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light justify-content-around header">
      <NavLink className="navbar-brand d-flex align-items-center " to="/">
        <img src="./images/logoCinema.png" alt="logoCinema" />
        <p
          className="font-weight-bold"
          style={{
            margin: 0,
            fontSize: 30,
            fontFamily: "'Merriweather', serif",
            fontWeight: "bold",
            color: "rgb(34,34,96)",
          }}
        >
          Cybersoft Cinema
        </p>
      </NavLink>
      <div
        style={{
          border: "1px solid #ced0da",
          paddingRight: 8,
          borderRadius: 6,
        }}
        className="d-flex "
      >
        <WrapperInput
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Tìm kiếm phim..."
        ></WrapperInput>
        <button
          className="btn-focus"
          style={{ backgroundColor: "white", border: "none" }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        style={{ flexGrow: 0 }}
        className="collapse navbar-collapse"
        id="collapsibleNavId"
      >
        <div className=" user ml-auto">
          {userState?.userInfo ? (
            <>
              <i className="fa-solid fa-user"></i>
              <span className="mr-3">{userState.userInfo.hoTen}</span>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                type="logout"
              >
                ĐĂNG XUẤT
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-info my-2 my-sm-0 mr-2"
                type="sumit"
                onClick={navigateRegister}
              >
                ĐĂNG KÝ
              </button>
              <button
                onClick={navigateLogin}
                className="btn btn-outline-success my-2 my-sm-0"
              >
                ĐĂNG NHẬP
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
