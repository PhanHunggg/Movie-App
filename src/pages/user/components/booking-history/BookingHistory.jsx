import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MOBILE, TABLET } from "../../../../constants";
import { withViewport } from "../../../../HOCs/withViewport";
import { fetchProfileUser } from "../../../../services/user";
import { formatDateShowTime } from "../../../../utils";
import "./bookingHistory.scss";

function BookingHistory({ device }) {
  const params = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfileUser();
  }, []);

  const getProfileUser = async () => {
    const result = await fetchProfileUser(params.user);
    setProfile(result.data.content);
  };

  const renderHistory = () => {
    return profile?.thongTinDatVe.map((ele) => {
      return (
        <div
          key={ele.maVe}
          className={`booked_tickets mb-4 col-lg-6 col-12`}
        >
          <div className="card movie">
            <img src={ele.hinhAnh} className="card-img-top" alt={ele.maVe} />
          </div>
          <div className="tickets">
            {" "}
            <p>
              Tên Phim: <span>{ele.tenPhim}</span>
            </p>
            <p>
              Thời lượng: <span>{ele.thoiLuongPhim}p</span>
            </p>
            <p>
              Ngày đặt vé: <span>{formatDateShowTime(ele.ngayDat)}</span>
            </p>
            <p>Tên Rạp: {ele.danhSachGhe[0].tenHeThongRap}</p>
            <p>Rạp Chiếu: {ele.danhSachGhe[0].tenRap}</p>
            <p>
              Ghế đã đặt:
              {ele.danhSachGhe.map((ele, idx) => {
                return (
                  <React.Fragment key={ele.maGhe}>
                    <span className="chair mt-3">{ele.tenGhe}</span>
                    {idx + 1 === 3 && <p></p>}
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className={`container booked ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
    >
      <div className="row">{renderHistory()}</div>
    </div>
  );
}

export default withViewport(BookingHistory);
