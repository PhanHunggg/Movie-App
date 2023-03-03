import React, { useContext, useEffect, useState } from "react";
import { Button, notification, Table, Input } from "antd";
import { deleteUserApi, fetchUserListApi } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading/LoadingContext";

export default function UserManagement() {
  const { Search } = Input;
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [userList, setUserList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  const handleMovieListFilter = () => {
    const filterMovie = userList?.filter((ele) => {
      return (
        ele.taiKhoan.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      );
    });
    return filterMovie;
  };

  console.log(userList);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    setLoadingState({ isLoading: true });
    if (userList?.length) setLoadingState({ isLoading: false });
  }, [userList]);

  const getUserList = async () => {
    let idx = 1;
    const result = await fetchUserListApi();
    const data = result.data.content;
    for (let i = 0; i < data.length; i++) {
      data[i].key = idx;
      idx++;
    }
    setUserList(data);
  };
  const handleDeleteUser = async (user) => {
    const data = [...userList];
    const idx = data.findIndex((ele) => ele.taiKhoan === user.taiKhoan);
    if (idx === -1) {
      notification.error({
        message: "Người dùng không có trong danh sách",
      });
    } else {
      try {
        await deleteUserApi(user.taiKhoan);
        data.splice(idx, 1);
        setUserList(data);

        notification.success({
          message: "Xóa người dùng thành công",
        });
      } catch (error) {
        notification.error({
          message: error.response.data.content,
        });
      }
    }
  };
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "key",
      key: "1",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "2",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "3",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "4",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "5",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "6",
    },
    {
      title: "Tác vụ",
      key: "7",
      render: (text) => {
        return (
          <div>
            <Button
              onClick={() => {
                navigate(`/admin/user-management/edit-user/${text.taiKhoan}`);
              }}
              className="mb-1"
              type="primary"
              style={{ backgroundColor: "green" }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>

            <Button
              onClick={() => handleDeleteUser(text)}
              className="mx-2"
              type="primary"
              danger
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h3>Danh sách người dùng</h3>

      <div className="service">
        <Button
          style={{ padding: "16px 10px ", lineHeight: 0, fontWeight: 600 }}
          onClick={() => {
            navigate("/admin/user-management/add-user");
          }}
          className="mb-4 "
          type="primary"
        >
          Thêm người dùng
        </Button>

        <Search
          className="search"
          placeholder="Tìm kiếm tài khoản người dùng..."
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleChange}
        />
      </div>
      <Table
        style={{ fontWeight: 600, fontSize: 18 }}
        columns={columns}
        dataSource={handleMovieListFilter()}
      />
    </div>
  );
}
