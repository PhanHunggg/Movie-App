import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileUser, updateProfile } from "../../../../services/user";

export default function Profile(props) {
  
  const [form, setForm] = useState({
    email: "",
    hoTen: "",
    soDT: "",
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
    event.preventDefault();
    console.log(form);
    const data = {
      taiKhoan: form.taiKhoan,
      matKhau: form.matKhau,
      email: form.email,
      soDt: form.soDT,
      maNhom: form.maNhom,
      maLoaiNguoiDung: form.maLoaiNguoiDung,
      hoTen: form.hoTen,
    };

    try {
      await updateProfile(data);
      notification.success({
        message: "Cập nhật thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
      });
    }
  };

  useEffect(() => {
    if (props.profile) {
      setForm(props.profile);
    }
  }, [props.profile]);
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="row container mx-auto">
        <div className="col-6 content">
          <input
            onChange={handleChange}
            name="email"
            type="text"
            className="form-control"
            placeholder="Email"
            value={form?.email}
          />
          <input
            onChange={handleChange}
            name="hoTen"
            type="text"
            className="form-control"
            placeholder="Họ tên"
            value={form?.hoTen}
          />
          <input
            onChange={handleChange}
            name="soDT"
            type="text"
            className="form-control"
            placeholder="Số điện thoại"
            value={form?.soDT}
          />
        </div>
        <div className="col-6 content">
          <input
            onChange={handleChange}
            name="taiKhoan"
            type="text"
            className="form-control"
            placeholder="Tài khoản"
            value={form?.taiKhoan}
          />
          <input
            onChange={handleChange}
            name="matKhau"
            type="password"
            className="form-control"
            placeholder="Mật khẩu"
            value={form?.matKhau}
          />
        </div>
      </div>
      <div className="button container ">
        <button className="btn btn-primary">Lưu</button>
      </div>
    </form>
  );
}
