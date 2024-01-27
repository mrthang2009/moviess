import styles from "./stylesPage/MovieDetailPage.module.scss";
import axiosClient from "../libraries/axiosClient";
import generateRandomInteger from "../untils/randomNumber";
import Title from "../components/Title/Title";

import { useEffect, useState, useCallback } from "react";
import MovieSider from "../components/MovieSider/MovieSider";
import { Spin, Col, Row, Divider } from "antd";
import { useParams } from "react-router-dom";
import PosterMovie from "../components/PosterMovie/PosterMovie";
import { Helmet } from "react-helmet"; // import PosterItem from "../components/PosterItem/PosterItem";
import PosterItem from "../components/PosterItem/PosterItem";
const MovieDetailPage = () => {
  const { slug } = useParams();
  const [selectedKey, setSelectedKey] = useState("1"); // Sử dụng state để lưu trạng thái option được chọn
  const [tvShows, setTvShows] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);

  const getTVShows = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/v1/api/danh-sach/tv-shows`);
      setTvShows(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getDetailMovie = useCallback(async (slug) => {
    try {
      const res = await axiosClient.get(`/phim/${slug}`);
      setDetailMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getFeaturedMovie = useCallback(async (randomNumber) => {
    try {
      const res = await axiosClient.get(
        `/danh-sach/phim-moi-cap-nhat?page=${randomNumber}`
      );
      setFeaturedMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const randomNumber = generateRandomInteger();
    getTVShows();
    getDetailMovie(slug);
    getFeaturedMovie(randomNumber);
  }, [slug]);
  const tabs = [
    {
      key: "1",
      label: "Thông tin",
    },
    {
      key: "2",
      label: "Diễn viên",
    },
  ];
  const renderSummaryTab = () => (
    <>
      <h2>Tóm tắt</h2>
      <p>{detailMovie?.movie?.content}</p>
    </>
  );

  const renderActorTab = () => (
    <>
      <h2>Diễn viên chính</h2>
      <Row>
        {detailMovie.movie &&
          detailMovie.movie.actor &&
          detailMovie.movie.actor.map((item, index) => (
            <Col span={6} key={index}>
              <Row gutter={[16, 20]} className="flex align-items-center">
                <Col span={8}>
                  <div className={styles.avatar}>
                    <img
                      src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-3.jpg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col span={16}>
                  <p>{item}</p>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </>
  );

  const contentMappings = {
    1: renderSummaryTab(),
    2: renderActorTab(),
    // Thêm các mapping cho các selectedKey khác nếu cần
  };

  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };
  console.log("««««« detailMovie »»»»»", detailMovie);
  return (
    <>
      <Helmet>
        <title>
          {detailMovie && detailMovie.movie
            ? detailMovie.movie.name
            : "Movies T"}
        </title>
      </Helmet>
      <main className="container">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={17}>
            <section>
              {detailMovie && detailMovie.movie ? (
                <PosterMovie
                  url_backdrop={detailMovie.movie.thumb_url}
                  url_poster={detailMovie.movie.poster_url}
                  name={detailMovie.movie.name}
                  origin_name={detailMovie.movie.origin_name}
                  release={detailMovie.movie.year}
                  country={detailMovie.movie.country}
                  category={detailMovie.movie.category}
                  time={detailMovie.movie.time}
                  type={detailMovie.movie.type}
                  quality={detailMovie.movie.quality}
                  lang={detailMovie.movie.lang}
                  status={detailMovie.movie.status}
                  episode_current={detailMovie.movie.episode_current}
                  episode_total={detailMovie.movie.episode_total}
                  slug={detailMovie.movie.slug}
                />
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
            </section>
            <section>
              <ul className={styles.tabs}>
                {tabs.map((tabs) => (
                  <li
                    key={tabs.key}
                    onClick={() => setSelectedKey(tabs.key)}
                    className={
                      tabs.key === selectedKey ? styles.selectedTab : ""
                    }
                  >
                    {tabs.label}
                  </li>
                ))}
              </ul>
              <Divider style={{ borderColor: "#727272" }} />
              <div className={styles.conentTab}>
                {contentMappings[selectedKey]}
              </div>
            </section>
            <section>
            <Title
              type="section"
              label="Phim mới cập nhật"
              url="/phim-moi-cap-nhat"
            />
              <Row gutter={[16, 16]}>
                {featuredMovie && featuredMovie.items ? (
                  shuffleArray(featuredMovie.items)
                    .slice(0, 6)
                    .map((item) => (
                      <Col
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                        key={item._id}
                        className={styles.posterItem}
                      >
                        <PosterItem
                          type="featuredMovie"
                          slug={item.slug}
                          url_poster={item.poster_url}
                          name={item.name}
                          quality={item.quality}
                          lang={item.lang}
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
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={7}>
            <Title label="Shows truyền hình" />
            <Row gutter={[16, 16]}>
              {tvShows && tvShows.items ? (
                tvShows.items
                  .map((item) => (
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
    </>
  );
};

export default MovieDetailPage;
