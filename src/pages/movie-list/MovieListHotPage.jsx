import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { fetchMovieListAction } from "../../store/actions/userActions";
import "./movieListPage.scss";

export default function MovieListHotPage() {
  const navigate = useNavigate();

  const [loadingState, setLoadingState] = useContext(LoadingContext);

  const dispatch = useDispatch();

  const navigateMovieDetail = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  const stateMovie = useSelector((state) => state.userReducer);
  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    if (stateMovie.movieList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [stateMovie]);

  const getMovieList = () => {
    if (stateMovie.movieList.length) return;
    setLoadingState({ isLoading: true });
    dispatch(fetchMovieListAction());
  };

  const renderMovieList = () => {
    const filterMovie = stateMovie.movieList?.filter((ele) => {
      return ele.hot === true;
    });
    return filterMovie.map((ele) => {
      return (
        <div key={ele.maPhim} className="col-4">
          <div className="card mb-4">
            <div>
              <div className="rate">
                <span className="rate-quality">FHD</span>
                <span className="rate-point">
                  <i className="fa-solid fa-star"></i>
                  {ele.danhGia}/10
                </span>
              </div>
              <img src={ele.hinhAnh} alt="test" />
              <button onClick={() => navigateMovieDetail(ele.maPhim)}>
                Mua vé
              </button>
              <h4>{ele.tenPhim} </h4>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div style={{ paddingTop: "170px" }} className="container list-page">
      <div className="filter-moviePage">
        <div className="row movie">{renderMovieList()}</div>
      </div>
    </div>
  );
}
