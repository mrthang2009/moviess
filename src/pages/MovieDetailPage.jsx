import styles from "./stylesPage/MovieDetailPage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import MovieSider from "../components/MovieSider/MovieSider";
import { Spin, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import PosterMovie from "../components/PosterMovie/PosterMovie";
import { Helmet } from "react-helmet"; // import PosterItem from "../components/PosterItem/PosterItem";

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
      setDetailMovie(res.data);
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
          <Col span={17}>
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
          </Col>
          <Col span={7}>
            {/* <Title label="Shows truyền hình" /> */}
            <div className={styles.list_movie_sider}>
              {tvShows && tvShows.items ? (
                tvShows.items.map((item) => (
                  <MovieSider
                    key={item._id}
                    url_backdrop={item.thumb_url}
                    name={item.name}
                    realese={item.year}
                    slug={item.slug}
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
    </>
  );
};

export default MovieDetailPage;
