import React from "react";
<<<<<<< HEAD
import "./PageNotFound.scss";

import { withViewport } from "../../HOCs/withViewport";
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../../constants";

function PageNotFound({ device }) {
  return (
    <>
      <span
        className={`not__found__404 ${device === TABLET && "tablet"} ${
          device === MOBILE && "mobile"
        } ${device === LAPTOP && "laptop"} ${device === DESKTOP && "desktop"}`}
      >
        404
      </span>
=======
import { MOBILE, TABLET } from "../../constants";
import { withViewport } from "../../HOCs/withViewport";
import "./PageNotFound.scss";
function PageNotFound({ device }) {
  return (
    <div
      className={`page_not_found ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
    >
      <span className="not__found__404">404</span>
>>>>>>> 4f6ac376f45c1a33c460895b42c0cb76c4f26e0b
      <span className="not__found">page not found</span>
      <div className="img__notfound">
        <img
          src="https://media.istockphoto.com/id/1197233052/vi/vec-to/trang-kh%C3%B4ng-t%C3%ACm-th%E1%BA%A5y-l%E1%BB%97i-404-robot-s%E1%BB%ADa-ch%E1%BB%AFa-s%E1%BB%ADa-ch%E1%BB%AFa-tai-n%E1%BA%A1n-ch%E1%BA%BFt-ng%C6%B0%E1%BB%9Di-v%E1%BA%BD-tay-%C4%91%C6%B0%E1%BB%9Dng-vi%E1%BB%81n.jpg?s=170667a&w=0&k=20&c=YlctBZ2YP2kC5wXmzKM167-I-NHW47kVmlqS7i9l2rY="
          alt=""
        />
      </div>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 4f6ac376f45c1a33c460895b42c0cb76c4f26e0b
  );
}

export default withViewport(PageNotFound);
