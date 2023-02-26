import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MOBILE, TABLET } from "../../../../constants";
import { withViewport } from "../../../../HOCs/withViewport";
import { fetchShowtimeAction } from "../../../../store/actions/userActions";
import { formatDateShowTime } from "../../../../utils";
import "./showTime.scss";

function Showtime({ device }) {
  const dispatch = useDispatch();
  const params = useParams();

  const showTimeList = useSelector((state) => state.userReducer);
  useEffect(() => {
    getShowTimeList();
  }, []);

  const getShowTimeList = () => {
    if (showTimeList.showTimeList.length) return;

    dispatch(fetchShowtimeAction(params.id));
  };

  const renderTap = () => {
    // console.log(showTimeList?.showTimeList?.heThongRapChieu);
    return showTimeList?.showTimeList?.heThongRapChieu?.map((ele, idx) => {
      return (
        <div
          key={ele.maHeThongRap}
          className={`nav-link text-capitalize ${idx === 0 && "active"} `}
          data-toggle="pill"
          href={`#${ele.maHeThongRap}`}
          role="tab"
          aria-selected="true"
        >
          <img src={ele.logo} alt={ele.tenHeThongRap} />
          {ele.tenHeThongRap}
        </div>
      );
    });
  };

  const renderTheater = () => {
    return showTimeList?.showTimeList?.heThongRapChieu?.map((ele, idx) => {
      return (
        <div
          key={ele.maHeThongRap}
          className={`tab-pane fade show ${idx === 0 && "active"}`}
          id={`${ele.maHeThongRap}`}
          role="tabpanel"
        >
          {ele?.cumRapChieu?.map((ele) => {
            return (
              <div key={ele.maCumRap} className="row mb-5 time">
                <div className="col-lg-1 col-md-2 col-sm-4">
                  <img className="img-fluid rounded" src={ele.hinhAnh} />
                </div>
                <div className="col-lg-11 col-md-10 col-sm-8 pl-0">
                  <h5>{ele.tenCumRap}</h5>
                  <span className="text-muted">{ele.diaChi}</span>
                </div>
                <div className="col-12">
                  <div className="row date_list">
                    {ele?.lichChieuPhim?.map((ele) => {
                      return (
                        <div key={ele.maLichChieu} className="col-lg-4 col-md-5 col-sm-6 btn_date">
                          <Link
                            className="date"
                            to={`/booking/${ele.maLichChieu}`}
                          >
                            {formatDateShowTime(ele.ngayChieuGioChieu)}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={`col-12 mt-5 showtime ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
    >
      <h3 className="title">Lịch chiếu</h3>

      <div className="row">
        <div className="col-3 tab">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {renderTap()}
          </div>
        </div>
        <div className="col-9 theater">
          <div className="tab-content" id="v-pills-tabContent">
            {renderTheater()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withViewport(Showtime);
