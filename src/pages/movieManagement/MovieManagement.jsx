import React, { useEffect, useState } from "react";
import { Button, notification, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieListAction } from "../../store/actions/userActions";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "../../services/movie";

export default function MovieManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.userReducer.movieList);
  useEffect(() => {
    getMovieList();
  }, []);
const [movie, setMovie] = useState();


  const getMovieList = () => {
    dispatch(fetchMovieListAction());
  };

  const columns = [
    {
      title: "Tên Phim",
      key: "1",
      dataIndex: "tenPhim",
    },
    {
      title: "Ngày Khởi Chiếu",
      key: "2",
      dataIndex: "ngayKhoiChieu",
      render: (text) => formatDate(text),
    },
    {
      title: "Mô tả",
      key: "3",
      dataIndex: "moTa",
    },
    {
      title: "Đánh Giá",
      key: "4",
      dataIndex: "danhGia",
    },
    {
      title: "Hành Động",
      key: "5",
      render: (text) => {
        return (
          <div key={text.maPhim}>
            <Button
              className="mb-1"
              style={{ backgroundColor: "green" }}
              type="primary"
              onClick={() => {
                navigate(`/admin/movie-management/edit/${text.maPhim}`);
              }}
            >
              EDIT
            </Button>
            <Button
              onClick={async () => {
                try {
                  await deleteMovieApi(text.maPhim);

                  notification.success({
                    message: "Xóa phim thành công",
                  });
                } catch (error) {
                  console.log(error);
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
            >
              DELETE
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          navigate("/admin/movie-management/add-movie");
        }}
        className="mb-4"
        type="primary"
      >
        Thêm phim
      </Button>

      <Table columns={columns} dataSource={movieList} />
    </div>
  );
}
