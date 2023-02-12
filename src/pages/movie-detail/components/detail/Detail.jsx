import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetailAction } from "../../../../store/actions/userActions";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();

  const movieState = useSelector((state) => state.userReducer);

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = () => {
    dispatch(fetchMovieDetailAction(params.id));
  };
  return (
    <div className="top pb-5">
      <div className="row">
        <div className="col-4">
          <div className="imgBox">
            <img
              src={movieState?.movieDetail?.hinhAnh}
              alt={movieState?.movieDetail?.tenPhim}
            />
            <div className="btn_trailer">
              <a className="btn btn_play" href="#">
                <i className="fa-solid fa-play"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-8">
          <h2>{movieState?.movieDetail?.tenPhim}</h2>
          <p className="rate">
            <i className="fa-solid fa-star"></i>
            <span>{movieState?.movieDetail?.danhGia}</span>/10
          </p>
          <p>
            Mô tả: <span>{movieState?.movieDetail?.moTa}</span>
          </p>
          <p>
            Ngày khởi chiếu:{" "}
            <span>{movieState?.movieDetail?.ngayKhoiChieu}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
