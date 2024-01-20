import { useState } from 'react';
import { Menu } from 'antd';
const NavsList = [
  {
    label: (
      <a href="/"  rel="noopener noreferrer">
        Trang chủ
      </a>
    ),
  },
  {
    label: (
      <a href="/phim-moi-cap-nhat"  rel="noopener noreferrer">
        Phim mới cập nhật
      </a>
    ),
  },
  {
    label: (
      <a href="/phim-le"  rel="noopener noreferrer">
        Phim lẻ
      </a>
    ),
  },
  {
    label: (
      <a href="/"  rel="noopener noreferrer">
        Phim bộ
      </a>
    ),
    key: 'mail',
  },
  {
    label: (
      <a href="/"  rel="noopener noreferrer">
        Hoạt hình
      </a>
    ),
    key: 'mail',
  },
  {
    label: (
      <a href="/"  rel="noopener noreferrer">
        TV Shows
      </a>
    ),
    key: 'mail',
  },
  
];

const NavigationBar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={NavsList} />;
};
export default NavigationBar;
