import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  UnorderedListOutlined,
  UserAddOutlined,
  PieChartOutlined,
  UserOutlined,
  ProfileOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          onClick={(items) => {
            navigate(items.key);
          }}
          theme="dark"
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={[
            {
              label: "Movie-Manager",
              icon: <MenuUnfoldOutlined />,
              children: [
                {
                  label: "Movie-List",
                  icon: <ProfileOutlined />,
                  key: "/admin/movie-management",
                },
                {
                  label: "Add-Movie",
                  icon: <PieChartOutlined />,
                  key: "/admin/movie-management/add-movie",
                },
              ],
            },
            {
              label: "User-Manager",
              icon: <UserOutlined />,
              children: [
                {
                  label: "User-List",
                  icon: <UnorderedListOutlined />,
                  key: "/admin/user-management",
                },
                {
                  label: "Add-User",
                  icon: <UserAddOutlined />,
                  key: "/admin/user-management/add-user",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
