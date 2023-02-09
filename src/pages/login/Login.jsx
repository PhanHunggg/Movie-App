import React from "react";
import { WrapperForm } from "./loginStyled";

export default function Login() {
  return (
    <>
      <div className="container py-5">
        <div className="row ">
          <div className="col-6">
            <WrapperForm className="form">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="button_submit text-center">
                  <button
                    style={{ paddingTop: "10px", width: "100%" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <hr />

                  <button
                    style={{ paddingTop: "10px", width: "100%" }}
                    type="submit"
                    className="btn btn-success mt-3"
                  >
                    Register
                  </button>
                </div>
              </form>
            </WrapperForm>
          </div>
          <div className="col-6">
            <h2 style={{ fontFamily: "'Merriweather', serif" }}>
              Chào mừng bạn đến với Cybersoft Cinema!
            </h2>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Hãy cùng bạn bè và gia đình khám phá thế giới movie tại
              <span style={{ color: "#FFC72C" }}> Cybersoft Cinema</span>
            </p>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              Chúc bạn có những trải nghiệm vui vẻ khi xem phim tại rạp !!!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
