import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovieListAction } from "../../store/actions/userActions";

export default function MovieListPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    return stateMovie.movieList.map((ele) => {
      return (
        <div key={ele.maPhim} className="col-4">
          <div className="card">
            <div>
              <img src={ele.hinhAnh} alt="test" />
              <button onClick={() => navigateMovieDetail(ele.maPhim)}>
                Mua vé
              </button>
            </div>
          </div>
          <h4>{ele.tenPhim} </h4>
        </div>
      );
    });
  };
  return (
    <div style={{ paddingTop: "170px" }}  className="container ">
      <div className="row movie">{renderMovieList()}</div>
    </div>
  );
}
