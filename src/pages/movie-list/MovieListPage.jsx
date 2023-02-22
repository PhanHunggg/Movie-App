import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { fetchMovieListAction } from "../../store/actions/userActions";

export default function MovieListPage() {
  // const [loadingState, setLoadingState] = useContext(LoadingContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navigateMovieDetail = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  const stateMovie = useSelector((state) => state.userReducer);
  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {

  }, [])

  const getMovieList = () => {
    if (stateMovie.movieList.length) return;
    // setLoadingState({ isLoading: true });
    dispatch(fetchMovieListAction());
    // setLoadingState({ isLoading: false });
  };

  const renderMovieList = () => {
    return stateMovie.movieList.map((ele) => {
      console.log(ele);
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
    <div style={{ paddingTop: "170px" }} className="container ">
      <div className="row movie">{renderMovieList()}</div>
    </div>
  );
}
