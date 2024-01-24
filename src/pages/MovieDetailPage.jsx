import styles from "./stylesPage/SinglePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import MovieSider from "../components/MovieSider/MovieSider";
import { Spin, Col, Row } from "antd";
import { useParams } from "react-router-dom";
// import PosterItem from "../components/PosterItem/PosterItem";

const MovieDetailPage = () => {
  const { slug } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);
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
      setDetailMovie(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTVShows();
    getDetailMovie(slug);
  }, [slug]);
  console.log("««««« detailMovie »»»»»", detailMovie);
  return (
    <main className="container">
      <Row gutter={16}>
        <Col span={17}>
          <Title label="Phim lẻ" />
          <Row gutter={[16, 16]}>
            {/* {detailMovie && detailMovie.items ? (
              detailMovie.items.map((item) => (
                <Col span={4} key={item._id} className={styles.posterItem}>
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
            )} */}
          </Row>
        </Col>
        <Col span={7}>
          <Title label="Shows truyền hình" />
          <div className={styles.list_movie_sider}>
            {tvShows && tvShows.items ? (
              tvShows.items.map((item) => (
                <MovieSider
                  key={item._id}
                  url_backdrop={item.thumb_url}
                  name={item.name}
                  realese={item.year}
                />
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
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default MovieDetailPage;
