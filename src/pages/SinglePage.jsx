import styles from "./stylesPage/SinglePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import generateRandomInteger from "../untils/randomNumber";
import MovieSider from "../components/MovieSider/MovieSider";
import { Pagination, Spin, Col, Row } from "antd";
import PosterItem from "../components/PosterItem/PosterItem";
import { useNavigate } from "react-router-dom";
const LIMIT_PAGE = 24;

const SinglePage = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    pageSize: LIMIT_PAGE,
  });
  const getFeaturedMovie = useCallback(async (randomNumber) => {
    try {
      const res = await axiosClient.get(
        `/danh-sach/phim-moi-cap-nhat?page=${randomNumber}&limit=20`
      );
      setFeaturedMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getSingleMovie = useCallback(async (pagination) => {
    try {
      const res = await axiosClient.get(
        `/v1/api/danh-sach/phim-le?page=${pagination.page}&limit=${pagination.pageSize}`
      );
      setSingleMovie(res.data.data);
      setPagination((prev) => ({
        ...prev,
        total: res.data.data.params.pagination.totalItems,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // Hàm để kiểm tra xem số ngẫu nhiên đã được lưu trong sessionStorage chưa
  const isRandomNumber = () => {
    return sessionStorage.getItem("randomNumber") !== null;
  };

  // Effect chạy sau mỗi lần render
  useEffect(() => {
    // Kiểm tra xem đã có số ngẫu nhiên trong sessionStorage chưa
    if (!isRandomNumber()) {
      // Nếu chưa có, sinh số ngẫu nhiên và lưu vào sessionStorage
      const randomValue = generateRandomInteger();
      sessionStorage.setItem("randomNumber", randomValue);
    } else {
      // Nếu đã có, lấy số từ sessionStorage và sử dụng
      const randomNumber = sessionStorage.getItem("randomNumber");
      getFeaturedMovie(randomNumber);
    }
  }, []);
  useEffect(() => {
    getSingleMovie(pagination);
    if (pagination.page === 1) {
      navigate(`/phim-le`);
    } else {
      navigate(`/phim-le?page=${pagination.page}`);
    }
  }, [navigate, pagination.page, pagination.pageSize]);
  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));
      getSingleMovie();
    },
    [getSingleMovie]
  );
  return (
    <main className="container">
      <div className={styles.box_main}>
        <Row gutter={16}>
          <Col span={16}>
            <Title label="Phim lẻ" url="/phim-le" />
            <Row gutter={[16, 16]}>
              {singleMovie && singleMovie.items ? (
                singleMovie.items.map((item) => (
                  <Col span={6} key={item._id} className={styles.posterItem}>
                    <PosterItem
                      url_poster={item.poster_url}
                      name={item.name}
                      realese={item.year}
                    />
                  </Col>
                ))
              ) : (
                <Spin size="large" />
              )}
            </Row>

            <div className={styles.pagination}>
              <Pagination
                defaultCurrent={1}
                total={pagination.total}
                pageSize={LIMIT_PAGE}
                current={pagination.page}
                onChange={onChangePage}
                showSizeChanger={false}
              />
            </div>
          </Col>
          <Col span={8}>
            <Title label="Phim mới" url="/phim-moi-cap-nhat" />
            <div className={styles.list_movie_sider}>
              {featuredMovie && featuredMovie.items ? (
                featuredMovie.items.map((item) => (
                  <MovieSider
                    key={item._id}
                    url_backdrop={item.thumb_url}
                    name={item.name}
                    realese={item.year}
                  />
                ))
              ) : (
                <Spin size="large" />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default SinglePage;
