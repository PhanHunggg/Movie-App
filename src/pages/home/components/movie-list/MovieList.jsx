import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovieListAction } from "../../../../store/actions/userActions";
import "./movieList.scss";

export default function MovieList() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateMovieList = () => {
    navigate("/movie-list");
  };

  const navigateMovieDetail = (id) => {
    navigate(`/movie-detail/${id}`);
  };

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
                <div>
                  <img style={{ width: "100%" }} src={ele.hinhAnh} alt="test" />
                  <button onClick={() => navigateMovieDetail(ele.maPhim)}>
                    Mua vé
                  </button>
                </div>
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
        <button onClick={navigateMovieList} className="btn btn-primary ">
          XEM THÊM
          <i className="fa-solid fa-arrow-right pl-2"></i>
        </button>
      </div>
    </div>
  );
}
