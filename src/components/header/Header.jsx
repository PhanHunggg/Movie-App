import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserAction } from "../../store/actions/userActions";
import { WrapperInput } from "./headerStyled";
import "./header.scss";
import { withViewport } from "../../HOCs/withViewport";
import { DESKTOP, MOBILE, TABLET } from "../../constants";

function Header({ device }) {
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
    <nav
      className={`navbar navbar-expand-sm navbar-light justify-content-around header ${
        device === TABLET && "tablet"
      } ${device === MOBILE && "mobile"}`}
    >
      <NavLink className="navbar-brand d-flex align-items-center " to="/">
        <img src="./images/logoCinema.png" alt="logoCinema" />
        <p className="font-weight-bold">Cybersoft Cinema</p>
      </NavLink>
      <div className="d-flex search ">
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Tìm kiếm phim..."
        ></input>
        <button className="btn-focus">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div
        className="collapse navbar-collapse user"
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

export default withViewport(Header);
