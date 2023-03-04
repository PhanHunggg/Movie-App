import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setUserAction } from "../../store/actions/userActions";
import "./header.scss";
import { withViewport } from "../../HOCs/withViewport";
import { MOBILE, TABLET } from "../../constants";
import { formatDateSearch } from "../../utils";

function Header({ device }) {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { movieList } = userState;
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  console.log(movieList);

  const navigateRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserAction(null));

    navigate("/");
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const renderMovieSearch = () => {
    const filterMovie = movieList?.filter((ele) => {
      return (
        ele.tenPhim
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .toLowerCase()
          .indexOf(keyword?.toLowerCase()) !== -1
      );
    });

    return filterMovie?.map((ele) => {
      return (
        <div key={ele.maPhim} className="card">
          <div className=" row">
            <div className="col-4">
              <button
                onClick={() => {
                  navigate(`/movie-detail/${ele.maPhim}`);
                }}
              >
                <img src={ele.hinhAnh} alt={ele.maPhim} />
              </button>
            </div>
            <div className="col-8">
              <div className="content">
                <p>Tên phim: {ele.tenPhim}</p>
                <p>
                  Đánh giá: <span>{ele.danhGia}</span>/10
                </p>
                <p>Ngày chiếu: {formatDateSearch(ele.ngayKhoiChieu)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleChangeY = () => {
    window.addEventListener("scroll", function (event) {
      var scroll_y = this.scrollY;
      // console.log(scroll_y);

      if (scroll_y !== 0) {
        document.querySelector(".header").classList.add("scroll");
      } else {
        document.querySelector(".header").classList.remove("scroll");
      }
    });
  };
  return (
    <nav
      className={`navbar navbar-expand-sm navbar-light justify-content-around header ${
        device === TABLET && "tablet"
      } ${device === MOBILE && "mobile"}`}
      style={{ background: "transparent" }}
      onChange={handleChangeY()}
    >
      <NavLink className="navbar-brand d-flex align-items-center " to="/">
        <img src="./images/logoCinema.png" alt="logoCinema" />
        <p className="font-weight-bold">Cybersoft Cinema</p>
      </NavLink>
      {device === MOBILE ? (
        ""
      ) : (
        <div className="d-flex search ml-2">
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Tìm kiếm phim..."
          ></input>
          <button className="btn-focus">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {keyword && <div className="active">{renderMovieSearch()}</div>}
        </div>
      )}

      <div className="collapse navbar-collapse user" id="collapsibleNavId">
        <div className=" action ml-2">
          {userState?.userInfo ? (
            <>
              <Link to={`/profile/${userState?.userInfo?.taiKhoan}`}>
                <span className="mr-3">{userState.userInfo.hoTen}</span>
              </Link>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" />
                </button>
                <div className="dropdown-menu">
                  <Link to={`/profile/${userState?.userInfo?.taiKhoan}`}>
                    <button className="btn-information btn-primary dropdown-item">
                      THÔNG TIN
                    </button>
                  </Link>
                  {userState?.userInfo?.maLoaiNguoiDung === "QuanTri" && (
                    <button
                      onClick={() => {
                        navigate("/admin/movie-management");
                      }}
                      className="btn btn-success btn-admin dropdown-item"
                      type="logout"
                    >
                      ADMIN
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-logout dropdown-item"
                    type="logout"
                  >
                    ĐĂNG XUẤT
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user" />
              </button>
              <div className="dropdown-menu">
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-2 dropdown-item btn-register"
                  type="sumit"
                  onClick={navigateRegister}
                >
                  ĐĂNG KÝ
                </button>
                <button
                  onClick={navigateLogin}
                  className="btn btn-outline-success my-2 my-sm-0 dropdown-item btn-login"
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withViewport(Header);
