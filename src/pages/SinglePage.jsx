import styles from "./stylesPage/SinglePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import MovieSider from "../components/MovieSider/MovieSider";
import { Pagination, Spin, Col, Row } from "antd";
import PosterItem from "../components/PosterItem/PosterItem";
import { useNavigate } from "react-router-dom";
const LIMIT_PAGE = 25;

const SinglePage = () => {
  const navigate = useNavigate();
  const [tvShows, setTvShows] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    pageSize: LIMIT_PAGE,
  });
  const getTVShows = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/v1/api/danh-sach/tv-shows`);
      setTvShows(res.data.data);
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

  useEffect(() => {
    getTVShows();
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
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={16} xl={17}>
          <Title label="Phim lẻ" />
          <Row gutter={[0, 16]} className={styles.customRow}>
            {singleMovie && singleMovie.items ? (
              singleMovie.items.map((item) => (
                <Col key={item._id} className={styles.posterItem}>
                  <PosterItem
                    slug={item.slug}
                    url_poster={item.poster_url}
                    name={item.name}
                    quality={item.quality}
                    lang={item.lang}
                    typeMovie={item.type}
                  />
                </Col>
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Spin size="large" />
              </div>
            )}
          </Row>
          {singleMovie.items ? (
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
          ) : null}
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={7}>
          <Title label="Shows truyền hình" />
          <Row gutter={[16, 16]}>
            {tvShows && tvShows.items ? (
              tvShows.items.map((item) => (
                <Col xs={24} sm={24} md={12} lg={24} xl={24} key={item._id}>
                  <MovieSider
                    url_backdrop={item.thumb_url}
                    name={item.name}
                    realese={item.year}
                    slug={item.slug}
                  />
                </Col>
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Spin size="large" />
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </main>
  );
};

export default SinglePage;
