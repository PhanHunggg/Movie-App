import React, { useContext, useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAction } from "../../../../store/actions/userActions";
import { LoadingContext } from "../../../../contexts/loading/LoadingContext";
import { withViewport } from "../../../../HOCs/withViewport";
import { MOBILE, TABLET } from "../../../../constants";
import "./banner.scss";
const contentStyle = {
  height: "720px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  objectFit: "cover",
  maxWidth: "100%",
  display: "inline-block",
  width: "100%",
};

function Banner({ device }) {
  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  useEffect(() => {
    getBannerList();
  }, []);

  useEffect(() => {
    if (userState.bannerList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [userState]);

  const getBannerList = () => {
    if (userState.bannerList.length) return;

    setLoadingState({ isLoading: true });

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
    <Carousel
      className={`banner ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
      autoplay
    >
      {renderBannerList()}
    </Carousel>
  );
}

export default withViewport(Banner);
