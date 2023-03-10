import React, { useContext, useEffect, useState } from "react";
import { Button, notification, Table, Input } from "antd";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi, fetchMovieListApi } from "../../services/movie";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import "./movieManagement.scss";

export default function MovieManagement() {
  const { Search } = Input;
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);
  const [keyword, setKeyword] = useState("");

  const handleMovieListFilter = () => {
    const filterMovie = movieList?.filter((ele) => {
      return (
        ele.tenPhim
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .toLowerCase()
          .indexOf(keyword.toLowerCase()) !== -1
      );
    });
    return filterMovie;
  };

  const onSearch = (value) => console.log(value);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    setLoadingState({ isLoading: true });
    if (movieList?.length) setLoadingState({ isLoading: false });
  }, [movieList]);

  const getMovieList = async () => {
    const result = await fetchMovieListApi();
    console.log(result);

    setMovieList(result.data.content);
  };

  const handleDeleteMovie = async (movie) => {
    try {
      const data = [...movieList];
      const idx = data.findIndex((ele) => ele.maPhim === movie.maPhim);
      if (idx === -1) return;
      await deleteMovieApi(movie.maPhim);

      data.splice(idx, 1);
      setMovieList(data);
      notification.success({
        message: "Xóa phim thành công",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: error.response.data.content,
      });
    }
  };

  const columns = [
    {
      title: "Tên Phim",
      key: "1",
      dataIndex: "tenPhim",
      align: "center",
      responsive: ["sm"],
    },
    {
      title: "Ngày Khởi Chiếu",
      key: "2",
      dataIndex: "ngayKhoiChieu",
      align: "center",
      responsive: ["lg"],

      render: (text) => formatDate(text),
    },
    {
      title: "Mô tả",
      key: "3",
      dataIndex: "moTa",
      responsive: ["lg"],
    },
    {
      title: "Đánh Giá",
      key: "4",
      dataIndex: "danhGia",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Hành Động",
      key: "5",
      align: "center",
      responsive: ["sm"],

      render: (text) => {
        return (
          <div style={{ display: "flex" }} key={text.maPhim}>
            <Button
              className="mb-1"
              style={{ backgroundColor: "green" }}
              type="primary"
              onClick={() => {
                navigate(`/admin/movie-management/edit/${text.maPhim}`);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              style={{ margin: "0 5px" }}
              type="primary"
              danger
              onClick={() => handleDeleteMovie(text)}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
            <Button
              onClick={() => {
                navigate(`/admin/movie-management/showtime/${text.maPhim}`);
              }}
              type="primary"
            >
              <i className="fa-solid fa-calendar-days"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="service">
        <Button
          onClick={() => {
            navigate("/admin/movie-management/add-movie");
          }}
          className="mb-4"
          type="primary"
        >
          Thêm phim
        </Button>

        <Search
          className="search"
          placeholder="Tìm kiếm phim..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          onChange={handleChange}
        />
      </div>

      <Table columns={columns} dataSource={handleMovieListFilter()} />
    </div>
  );
}
