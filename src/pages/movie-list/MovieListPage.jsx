import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovieListAction } from "../../store/actions/userActions";

export default function MovieListPage() {
  const navigate = useNavigate();

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
    return stateMovie.movieList.map((ele) => {
      return (
        <div key={ele.maPhim} className="col-4">
          <div className="card">
            <Link to={`/movie-detail/${ele.maPhim}`}>
              <img src={ele.hinhAnh} alt="test" />
              <p>Mua vé</p>
            </Link>
          </div>
          <h4>{ele.tenPhim} </h4>
        </div>
      );
    });
  };
  return (
    <div className="container py-5">
      <div className="row movie">{renderMovieList()}</div>
    </div>
  );
}
