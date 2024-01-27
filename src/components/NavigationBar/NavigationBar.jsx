import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Drawer } from "antd";
import { Link, useLocation } from "react-router-dom"; // Thêm useLocation từ react-router-dom
import { Helmet } from "react-helmet";
import styles from "./NavigationBar.module.scss";
import { MenuOutlined } from "@ant-design/icons";

const Navigation = () => {
  const location = useLocation(); // Sử dụng useLocation để lấy thông tin về đường dẫn hiện tại
  const items = [
    {
      key: "1",
      label: "Trang chủ",
      path: "/",
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
      key: "2",
      label: "Phim mới cập nhật",
      path: "/phim-moi-cap-nhat",
    },
  ];

  // Sử dụng useState để lưu trạng thái selectedKey
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>
          {items.find((item) => item.path === location.pathname)?.label ||
            "Movies T"}
        </title>
      </Helmet>
      <nav className={styles.nav}>
        <Menu
          className={styles.navBar}
          mode="horizontal"
          selectedKeys={[selectedKey]} // Sử dụng selectedKeys để chỉ định key đã chọn
          // breakpoint="lg"
        >
          {items.map((item) => (
            <Menu.Item
              key={item.path}
              className={styles.itemNav}
              onClick={() => setSelectedKey(item.path)} // Cập nhật selectedKey khi một Menu.Item được click
            >
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <i onClick={() => setOpen(true)}>
          <MenuOutlined />
        </i>
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Menu
            className={styles.navVisible}
            mode="vertical"
            selectedKeys={[selectedKey]} // Sử dụng selectedKeys để chỉ định key đã chọn
          >
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                onClick={() => setSelectedKey(item.path)} // Cập nhật selectedKey khi một Menu.Item được click
              >
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </nav>
    </>
  );
};

Navigation.propTypes = {
  role: PropTypes.string,
};

export default Navigation;
