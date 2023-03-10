import React from "react";
import { useSelector } from "react-redux";
import { MOBILE, TABLET } from "../../constants";
import { withViewport } from "../../HOCs/withViewport";
import "./modal.scss";

function Modal({ device }) {
  const movieState = useSelector((state) => state.userReducer);
  return (
    <div
      className={`modal fade  ${device === TABLET && "tablet"} ${
        device === MOBILE && "mobile"
      }`}
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <iframe
              src={movieState?.movieDetail?.trailer}
              title="YouTube video player"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withViewport(Modal);
