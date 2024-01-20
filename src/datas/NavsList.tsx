import HomePage from "../pages/HomePage";
import SinglePage from "../pages/SinglePage";
import SeriesPage from "../pages/SeriesPage";
import CartoonPage from "../pages/CartoonPage";
import ShowsPage from "../pages/ShowsPage";
import FeaturedPage from "../pages/FeaturedPage";
import React from 'react';
export const NavsList = [
  { name: "Trag chủ", page: <HomePage />, url: "/" },
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
  {
    name: "TV Shows",
    page: <ShowsPage />,
    url: "/tv-shows",
  },
  {
    name: "Phim mới cập nhật",
    page: <FeaturedPage/>,
    url: "/phim-moi-cap-nhat",
  },
];