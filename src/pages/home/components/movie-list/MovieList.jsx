import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovieListAction } from "../../../../store/actions/userActions";
import "./movieList.scss";

export default function MovieList() {
  const dispatch = useDispatch();

  const stateMovie = useSelector((state) => state.userReducer);
  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = () => {
    if (stateMovie.movieList.length) return;
    dispatch(fetchMovieListAction());
  };

  const renderMovieList = () => {
    return stateMovie.movieList.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maPhim}>
          {idx <= 2 && (
            <div className="col-4">
              <div className="card">
                <Link to={`/movie-detail/${ele.maPhim}`}>
                  <img style={{ width: "100%" }} src={ele.hinhAnh} alt="test" />
                  <p>Mua vé</p>
                </Link>
              </div>
              <h4>{ele.tenPhim} </h4>
            </div>
          )}
        </React.Fragment>
      );
    });
  };
  return (
    <div className="container py-5">
      <div className="row movie">{renderMovieList()}</div>
      <div className="text-right btn_xemThem">
        <Link className="btn btn-primary " to="/movie-list">
          XEM THÊM
          <i className="fa-solid fa-arrow-right pl-2"></i>
        </Link>
      </div>
    </div>
  );
}
