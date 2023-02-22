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

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination, Autoplay]);

export default function MovieList() {
  const stateMovie = useSelector((state) => state.userReducer);

  const [loadingState, setLoadingState] = useContext(LoadingContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (stateMovie.movieList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [stateMovie]);

  const navigate = useNavigate();

  const navigateMovieList = () => {
    navigate("/movie-list");
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
    return stateMovie.movieList.map((ele, idx) => {
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
    <div className="container py-5 mt-4">
      <div className="text-right btn_xemThem d-flex mb-3">
        <h2 className="ml-2">Phim Đang chiếu</h2>
        <button onClick={navigateMovieList} className="btn">
          XEM THÊM
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
  );
}
