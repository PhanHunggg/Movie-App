import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAction } from "../../../../store/actions/userActions";
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  objectFit: "cover",
  maxWidth: "100%",
  display: "inline-block",
  width: "100%",
};

export default function Banner() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  useEffect(() => {
    getBannerList();
  }, []);
  const getBannerList = () => {
    if (userState.bannerList.length) return;

    dispatch(fetchBannerAction());
  };

  const renderBannerList = () => {
    return userState.bannerList.map((ele) => {
      return (
        <div key={ele.maBanner}>
          <img style={contentStyle} src={ele.hinhAnh} alt={ele.maPhim} />
        </div>
      );
    });
  };
  return (
    <Carousel style={{ paddingTop: "116px" }} autoplay>
      {renderBannerList()}
    </Carousel>
  );
}
