import { Image, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "../../../contexts/loading/LoadingContext";
import { fetchMovieDetailApi } from "../../../services/movie";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Select,
} from "antd";
import {
  fetchCinemaComplexApi,
  fetchCinemaSystemApi,
} from "../../../services/cinema";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { createShowTime } from "../../../services/ticket";

export default function MovieShowtime() {
  const navigate = useNavigate();
  dayjs.extend(customParseFormat);

  // antd
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const params = useParams();
  const [form] = useForm();
  const [movie, setMovie] = useState({});
  const [cinemaSystem, setCinemaSystem] = useState([]);
  const [cinemaComplex, setCinemaComplex] = useState([]);

  const [_, setLoadingState] = useContext(LoadingContext);
  useEffect(() => {
    getMovieDetail();
    getCinemaSystem();
  }, []);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.id);

    setMovie(result.data.content);
  };

  const getCinemaSystem = async () => {
    const result = await fetchCinemaSystemApi();
    setCinemaSystem(result.data.content);
  };

  const getCinemaComplex = async (id) => {
    const result = await fetchCinemaComplexApi(id);

    setCinemaComplex(result.data.content);
  };

  useEffect(() => {
    setLoadingState({ isLoading: true });
    if (movie) setLoadingState({ isLoading: false });
  }, [movie]);

  const renderCinemaSystem = () => {
    return cinemaSystem.map((ele) => {
      return (
        <Select.Option key={ele.maHeThongRap} value={ele.maHeThongRap}>
          {ele.tenHeThongRap}
        </Select.Option>
      );
    });
  };

  const handleChange = (value) => {
    getCinemaComplex(value);
  };
  const handleCinemaCoplex = (event) => {
    console.log(event[1]);
  };

  const renderCinemaComplex = () => {
    return cinemaComplex.map((ele) => {
      return {
        value: ele.maCumRap,
        label: ele.tenCumRap,
        children: ele.danhSachRap.map((ele) => {
          return {
            value: ele.maRap,
            label: ele.tenRap,
          };
        }),
      };
    });
  };

  const handleFinish = async (value) => {
    value.ngayChieuGioChieu = moment(new Date(value.ngayChieuGioChieu)).format(
      "DD/MM/yyyy hh:mm:ss"
    );

    const data = {
      maPhim: params.id,
      ngayChieuGioChieu: value.ngayChieuGioChieu,
      maRap: value.maRap[0],
      giaVe: value.giaVe,
    };

    try {
      await createShowTime(data);
      notification.success({
        message: "Tạo lịch chiếu thành công!",
      });
      navigate("/admin/movie-management");
    } catch (error) {
      notification.success({
        message: error.response.data.content,
      });
    }
  };

  return (
    <div>
      <h3>-Tạo lịch chiếu-</h3>
      <div className="row  mt-4">
        <div className="col-5 text-center">
          <div className="img">
            <Image style={{ width: 235 }} src={movie.hinhAnh} />
          </div>
        </div>
        <div className="col-7">
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
              ngayChieuGioChieu: "",
              maRap: 0,
              giaVe: 0,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 650,
              margin: "auto",
              marginTop: 30,
            }}
          >
            <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Hệ thống rạp">
              <Select onChange={handleChange}>{renderCinemaSystem()}</Select>
            </Form.Item>

            <Form.Item name="maRap" label="Cụm rạp">
              <Cascader
                onChange={handleCinemaCoplex}
                options={renderCinemaComplex()}
              />
            </Form.Item>

            <Form.Item name="ngayChieuGioChieu" label="Ngày giờ chiếu">
              <DatePicker
                format="YYYY-MM-DD hh:mm:ss"
                showTime={{
                  defaultValue: dayjs("00:00:00", "hh:mm:ss"),
                }}
              />
            </Form.Item>

            <Form.Item name="giaVe" label="Giá vé">
              <InputNumber />
            </Form.Item>

            <Form.Item label="Tạo lịch chiếu">
              <Button type="primary" htmlType="submit">
                Button
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
