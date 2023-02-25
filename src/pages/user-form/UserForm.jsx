import React, { useEffect } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

import { useNavigate, useParams } from "react-router-dom";
import { GROUP_ID } from "../../constants";
import { addUserApi, fetchTypeUserApi, fetchUserInformationApi, updateUserApi } from "../../services/user";

export default function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = useForm();
  useEffect(() => {
    getTypeUser();
    if (params.user) {
      getUserInformation();
    }
  }, []);
  useEffect(() => {}, []);

  const getTypeUser = async () => {
    const result = await fetchTypeUserApi();
    setTypeUser(result.data.content);
  };

  const getUserInformation = async () => {
    const result = await fetchUserInformationApi(params.user);

    form.setFieldsValue({
      taiKhoan: result.data.content.taiKhoan,
      matKhau: result.data.content.matKhau,
      hoTen: result.data.content.hoTen,
      email: result.data.content.email,
      soDt: result.data.content.soDT,
      maLoaiNguoiDung: result.data.content.maLoaiNguoiDung,
    });
  };

  const handleFinish = async (value) => {
    console.log(value);
    const data = {
      taiKhoan: value.taiKhoan,
      matKhau: value.matKhau,
      email: value.email,
      soDt: value.soDt,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: value.maLoaiNguoiDung,
      hoTen: value.hoTen,
    };

    if (params.user) {
      try {
        await updateUserApi(data);
        notification.success({
          message: "Cập nhật người dùng thành công",
        });
        navigate("/admin/user-management");
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    } else {
      try {
        await addUserApi(data);
        notification.success({
          message: "Thêm người dùng thành công",
        });
        navigate("/admin/user-management");
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    }
  };
  const renderTypeUser = () => {
    return typeUser?.map((ele) => {
      return (
        <Select.Option key={ele.maLoaiNguoiDung} value={ele.maLoaiNguoiDung}>
          {ele.tenLoai}
        </Select.Option>
      );
    });
  };
  return (
    <div>
      <h3>Thêm người dùng</h3>
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          maLoaiNguoiDung: "",
          hoTen: "",
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: "100%",
          marginTop: 40,
        }}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-5">
            <Form.Item name="taiKhoan" label="Tài Khoản">
              <Input />
            </Form.Item>
            <Form.Item name="matKhau" label="Mật Khẩu">
              <Input.Password />
            </Form.Item>
            <Form.Item name="hoTen" label="Họ Tên">
              <Input />
            </Form.Item>
          </div>
          <div className="col-7">
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="soDt" label="Số điện thoại">
              <Input />
            </Form.Item>

            <Form.Item name="maLoaiNguoiDung" label="Loại người dùng">
              <Select>{renderTypeUser()}</Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item className="mx-auto" label="Button">
          {params.user ? (
            <Button
              style={{ backgroundColor: "green" }}
              htmlType="submit"
              type="primary"
            >
              Cập nhật{" "}
            </Button>
          ) : (
            <Button htmlType="submit" type="primary">
              Thêm{" "}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
