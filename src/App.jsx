import "./App.css";
import { Routes, Route} from "react-router-dom";
import { NavsList } from "./datas/NavsList";
import Layout from "./components/layouts/Layout/Layout";
import { Helmet } from "react-helmet";
import MovieDetailPage from "./pages/MovieDetailPage";
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
            element={<MovieDetailPage/>}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
