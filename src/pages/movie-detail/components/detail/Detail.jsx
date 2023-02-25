import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "../../../../components/modal/Modal";
import { MOBILE, TABLET } from "../../../../constants";
import { withViewport } from "../../../../HOCs/withViewport";
import { fetchMovieDetailAction } from "../../../../store/actions/userActions";
import { formatDate } from "../../../../utils";
import "./detail.scss";

function Detail({ device }) {
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
    <div
      className={`top  movie ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
    >
      <div className="row">
        <div className="col-4">
          <div className="imgBox">
            <img
              src={movieState?.movieDetail?.hinhAnh}
              alt={movieState?.movieDetail?.tenPhim}
            />

            <div className="overlay"></div>
            <div className="trailer">
              <button data-toggle="modal" data-target="#exampleModal">
                <i className="fa-solid fa-play"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-8 detail ">
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
            <span>{formatDate(movieState?.movieDetail?.ngayKhoiChieu)}</span>
          </p>
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default withViewport(Detail);
