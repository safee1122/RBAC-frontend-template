import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout } from "antd";
import React from "react";
import User from "~/models/user";

export default function Header({ collapsed, toggle }) {
  const { Header } = Layout;
  // const data = User.getUserObjectFromCookies();
  // const BaseUrl = K.Network.URL.BaseAPI;

  // const imageUrl = data.user?.profileImageUrl
  //   ? `${BaseUrl}/${data.user.profileImageUrl}`
  //   : null;

  const handleMenuClick = ({ key }) => {
    const actions = {
      // 1: () => navigate("/profile", { replace: true }),
      1: () => User.logoutCall(),
      // 2: () => navigate("/change-password", { replace: true }),
    };
    actions[key]();
  };
  const items = [
    {
      key: 1,
      label: "Log Out",
    },
  ];

  return (
    <Header>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      <div className="app-header-right">
        <div className="loggedin-user-dd">
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {/* <Avatar src={imageUrl} icon={!imageUrl && <UserOutlined />} /> */}
              {User.getFullName()}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
