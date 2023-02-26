import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../../constants";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { withViewport } from "../../HOCs/withViewport";
import { fetchMovieListAction } from "../../store/actions/userActions";
import "./movieListPage.scss";

function MovieListPage(device) {
  const [loadingState, setLoadingState] = useContext(LoadingContext);

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
    if (stateMovie.movieList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [stateMovie]);

  const getMovieList = () => {
    if (stateMovie.movieList.length) return;

    setLoadingState({ isLoading: true });

    dispatch(fetchMovieListAction());
  };

  const renderNow = () => {
    return stateMovie.movieList?.filter((ele) => {
      return ele.dangChieu === true;
    });
  };

  const renderSoon = () => {
    return stateMovie.movieList?.filter((ele) => {
      return ele.sapChieu == true;
    });
  };

  const renderMovieList = (filterMovie) => {
    return filterMovie.map((ele) => {
      return (
        <div key={ele.maPhim} className="col-6 col-lg-4 col-xl-4">
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
    <div
      style={{ paddingTop: "170px" }}
      className={`list-page ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      } ${device === LAPTOP && "laptop"} ${device === DESKTOP && "desktop"}`}
    >
      <div className="container filter-moviePage">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active mr-3"
              id="pills-home-tab"
              data-toggle="pill"
              data-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              ĐANG CHIẾU
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              data-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              SẮP CHIẾU
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="row movie py-3">{renderMovieList(renderNow())}</div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="row movie py-3">
              {renderMovieList(renderSoon())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withViewport(MovieListPage);
