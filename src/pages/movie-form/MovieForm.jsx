import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GROUP_ID } from "../../constants";
import {
  addMovieApi,
  editMovieApi,
  fetchMovieDetailApiServices,
} from "../../services/movie";
import moment from "moment";

export default function MovieForm() {
  const navigate = useNavigate();
  const [form] = useForm();
  const params = useParams();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    if (params.id) {
      getMovieDetail();
    }
  }, [params.id]);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApiServices(params.id);

    form.setFieldsValue({
      tenPhim: result.data.content.tenPhim,
      moTa: result.data.content.moTa,
      trailer: result.data.content.trailer,
      ngayKhoiChieu: moment(result.data.content.ngayKhoiChieu),
      dangChieu: result.data.content.dangChieu,
      sapChieu: result.data.content.sapChieu,
      hot: result.data.content.hot,
      danhGia: result.data.content.danhGia,
    });

    setImage(result.data.content.hinhAnh);
  };

  const handleFinish = async (value) => {
    value.ngayKhoiChieu = value.ngayKhoiChieu.format("DD/MM/YYYY");

    const formData = new FormData();

    formData.append("maNhom", GROUP_ID);
    formData.append("tenPhim", value.tenPhim);
    formData.append("trailer", value.trailer);
    formData.append("moTa", value.moTa);
    formData.append("ngayKhoiChieu", value.ngayKhoiChieu);
    formData.append("sapChieu", value.sapChieu);
    formData.append("dangChieu", value.dangChieu);
    formData.append("hot", value.hot);
    formData.append("danhGia", value.danhGia);
    file && formData.append("File", file, file.name);

    if (params.id) {
      formData.append("maPhim", params.id);

      await editMovieApi(formData);
    } else {
      await addMovieApi(formData);
    }

    notification.success({
      message: params.id ? "Cập nhật phim thành công " : "Thêm phim thành công",
    });
    navigate("/admin/movie-management");
  };
  const handleFile = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <Form
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
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: 5,
      }}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        // rules={[
        //   { required: true, message: "Vui lòng nhập tên phim" },
        //   {
        //     min: 5,
        //     max: 20,
        //     message: "Vui lòng nhập từ 5 --> 20 ký tự",
        //   },
        // ]}
        label="Tên Phim"
        name="tenPhim"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày Khởi Chiếu:" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp Chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input onChange={handleFile} type="file" />
      </Form.Item>
      <Image src={image} />
      <Form.Item style={{ marginTop: 10 }} label="Tác vụ">
        {params.id ? (
          <Button
            style={{ backgroundColor: "green" }}
            type="primary"
            htmlType="submit"
          >
            Edit
          </Button>
        ) : (
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
