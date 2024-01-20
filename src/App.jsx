import "./App.css";
import { useState } from "react";
import { Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "./libraries/axiosClient";
import { NavsList } from "./datas/NavsList";
import Layout from "./components/layouts/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CreateOrder from "./pages/CreateOrder";
import decodeToken from "./libraries/tokenDecoding";
import EmployeePage from "./pages/";
import CustomerPage from "./pages/CustomerPage";
import SupplierPage from "./pages/SupplierPage";
import OrderPage from "./pages/OrderPage";
import AccountPage from "./pages/AccountPage";
import DetailOrderPage from "./pages/DetailOrderPage";
import OrderMePage from "./pages/OrderMePage";
import ChangePassword from "./pages/ChangePassword";
import StatisticalPage from "./pages/HomePage";
import PendingOrderPage from "./pages/PendingOrderPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ScanPage from "./pages/ScanPage";
import { Helmet } from "react-helmet";
// Lấy URL của trang hiện tại
const currentPath = window.location.pathname;
// Tìm logo tương ứng với URL trang hiện tại
const currentPageName = NavsList.find((item) => item.url === currentPath)?.name;

const PageName = () => {
  document.title = currentPageName || "";
  if (currentPageName) {
    return (
      <Helmet>
        <title>{currentPageName}</title>
      </Helmet>
    );
  }

  return null;
};
const App = () => {
  return (
    <>
      <PageName />
      <Routes>
        <Route path="/" element={<Layout />}>
          {NavsList.map((item) => (
            <Route key={item.name} path={item.url} element={item.page} />
          ))}
          {/* Điều hướnsg đến trang chi tiết mỗi phim */}
          <Route
            path="/movie/:movieId/:movieTitle"
            element={<MovieDetailPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/nowplaying" element={<NowPlayingPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
