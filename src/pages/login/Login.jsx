import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/user";
import { setUserAction } from "../../store/actions/userActions";
import { WrapperForm } from "./loginStyled";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await loginApi(form);

      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );

      dispatch(setUserAction(result?.data.content));

      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <div
        style={{ paddingTop: "175px", paddingBottom: "50px" }}
        className="container "
      >
        <div className="row ">
          <div className="col-6">
            <WrapperForm className="form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    onChange={handleChange}
                    name="matKhau"
                    type="password"
                    className="form-control"
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
