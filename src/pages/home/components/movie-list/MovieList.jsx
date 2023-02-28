import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovieListAction } from "../../../../store/actions/userActions";
import "./movieList.scss";
import SwiperCore, { Virtual, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { LoadingContext } from "../../../../contexts/loading/LoadingContext";
import { withViewport } from "../../../../HOCs/withViewport";
import { MOBILE, TABLET } from "../../../../constants";

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination, Autoplay]);

function MovieList({ device }) {
  const stateMovie = useSelector((state) => state.userReducer);

  const [_, setLoadingState] = useContext(LoadingContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stateMovie.movieList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [stateMovie]);

  const navigate = useNavigate();

  const navigateMovieListHot = () => {
    navigate("/movie-list-hot");
  };

  const navigateMovieDetail = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = () => {
    if (stateMovie.movieList.length) return;

    setLoadingState({ isLoading: true });

    dispatch(fetchMovieListAction());
  };

  const renderMovieList = () => {
    const filterMovieList = stateMovie.movieList?.filter((ele) => {
      return ele.hot === true;
    });
    return filterMovieList.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maPhim}>
          <SwiperSlide key={ele.maPhim}>
            <div className="card d-flex">
              <div>
                <img style={{ width: "100%" }} src={ele.hinhAnh} alt="test" />
                <button onClick={() => navigateMovieDetail(ele.maPhim)}>
                  Mua vé
                </button>
              </div>
            </div>
            <h4>{ele.tenPhim} </h4>
          </SwiperSlide>
        </React.Fragment>
      );
    });
  };
  return (
    <div style={{backgroundColor: "#0b0b0b"}} className="movie_list py-4">
      <div
        className={`container py-5 review ${
          device === TABLET && "tablet"
        } ${device === MOBILE && "mobile"}`}
      >
        <div className="text-right btn_xemThem d-flex mb-3">
          <h2 style={{color: "fffffe"}} className="ml-2">HOT</h2>
          <button onClick={navigateMovieListHot} className="btn">
            XEM TẤT CẢ
            <i className="fa fa-angle-right ml-2"></i>
          </button>
        </div>
        <div className="row movie">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView={3}
            className="mySwiper"
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {renderMovieList()}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default withViewport(MovieList);
