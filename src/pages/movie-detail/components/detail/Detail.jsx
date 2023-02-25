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

  const modal__trailer = () => {
    console.log("run");
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              <a className="btn btn_play" onClick={modal__trailer}>
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
