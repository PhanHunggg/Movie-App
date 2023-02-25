import React from "react";
import { useSelector } from "react-redux";
import "./modal.scss";

export default function Modal() {
  const movieState = useSelector((state) => state.userReducer);
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <iframe
              width="650"
              height="350"
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
