import { useState } from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Thêm useLocation từ react-router-dom
import { Helmet } from "react-helmet";
import styles from "./NavigationBar.module.scss";

const Navigation = () => {
  const location = useLocation(); // Sử dụng useLocation để lấy thông tin về đường dẫn hiện tại

  const items = [
    {
      key: "1",
      label: "Trang chủ",
      path: "/",
    },
    {
      key: "2",
      label: "Phim mới cập nhật",
      path: "/phim-moi-cap-nhat",
    },
    {
      key: "3",
      label: "Phim lẻ",
      path: "/phim-le",
    },
    {
      key: "4",
      label: "Phim bộ",
      path: "/phim-bo",
    },
    {
      key: "5",
      label: "Hoạt hình",
      path: "/hoat-hinh",
    },
    {
      key: "6",
      label: "TV Shows",
      path: "/tv-shows",
    },
  ];

  // Sử dụng useState để lưu trạng thái selectedKey
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  return (
    <>
      <Helmet>
        <title>
          {items.find((item) => item.path === location.pathname)?.label ||
            "Movies T"}
        </title>
      </Helmet>
      <Menu
        className={styles.navBar}
        mode="horizontal"
        selectedKeys={[selectedKey]} // Sử dụng selectedKeys để chỉ định key đã chọn
        breakpoint="lg"
      >
        {items.map((item) => (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            className={styles.itemNav}
            onClick={() => setSelectedKey(item.path)} // Cập nhật selectedKey khi một Menu.Item được click
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

Navigation.propTypes = {
  role: PropTypes.string,
};

export default Navigation;
