import HomePage from "../pages/HomePage";
import SinglePage from "../pages/SinglePage";
import SeriesPage from "../pages/SeriesPage";
import CartoonPage from "../pages/CartoonPage";
import FeaturedPage from "../pages/FeaturedPage";
export const NavsList = [
  { name: "Trang chủ", page: <HomePage />, url: "/" },
  {
    name: "Phim mới cập nhật",
    page: <FeaturedPage />,
    url: "/phim-moi-cap-nhat",
  },
  {
    name: "Phim lẻ",
    page: <SinglePage />,
    url: "/phim-le",
  },
  {
    name: "Phim bộ",
    page: <SeriesPage />,
    url: "/phim-bo",
  },
  {
    name: "Hoạt hình",
    page: <CartoonPage />,
    url: "/hoat-hinh",
  },

];
