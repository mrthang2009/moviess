import styles from "./stylesPage/WatchMoviePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import generateRandomInteger from "../untils/randomNumber";

import { useEffect, useState, useCallback } from "react";
import MovieSider from "../components/MovieSider/MovieSider";
import { Spin, Col, Row, Divider } from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import PosterItem from "../components/PosterItem/PosterItem";
import Title from "../components/Title/Title";

const WatchMoviepage = () => {
  const { slug } = useParams();
  const [tvShows, setTvShows] = useState([]);
  const [detailMovie, setDetailMovie] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [selectedServerObject, setSelectedServerObject] = useState(null);
  const [selectedEpisodeObject, setSelectedEpisodeObject] = useState(null);

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
    getTVShows();
    getDetailMovie(slug);
    const randomNumber = generateRandomInteger();
    getFeaturedMovie(randomNumber);
  }, [slug]);
  // Hàm để kiểm tra xem số ngẫu nhiên đã được lưu trong sessionStorage chưa
  const isRandomNumber = () => {
    return sessionStorage.getItem("randomNumber") !== null;
  };
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
    if (detailMovie.episodes && detailMovie.episodes.length > 0) {
      setSelectedServer(detailMovie.episodes[0].server_name);
      setSelectedEpisode(detailMovie.episodes[0].server_data[0].name);
    }
  }, [detailMovie.episodes]);

  useEffect(() => {
    if (detailMovie.episodes && detailMovie.episodes.length > 0) {
      const serverObject = detailMovie.episodes.find(
        (server) => server.server_name === selectedServer
      );
      setSelectedServerObject(serverObject);

      if (serverObject && serverObject.server_data.length > 0) {
        const episodeObject = serverObject.server_data.find(
          (episode) => episode.name === selectedEpisode
        );
        setSelectedEpisodeObject(episodeObject);
      } else {
        setSelectedEpisodeObject(null);
      }
    } else {
      setSelectedServerObject(null);
      setSelectedEpisodeObject(null);
    }
  }, [detailMovie.episodes, selectedServer, selectedEpisode]);
  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };
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
              {selectedEpisodeObject ? (
                <VideoPlayer linkEmbed={selectedEpisodeObject.link_embed} />
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
            <Divider style={{ borderColor: "#727272" }} />
            <section className={styles.conentTab}>
              <h2>Chọn Server</h2>
              <ul className={styles.tabs}>
                {detailMovie.episodes &&
                  detailMovie.episodes.map((server) => (
                    <li
                      key={server.server_name}
                      onClick={() => setSelectedServer(server.server_name)}
                      className={
                        server.server_name === selectedServer
                          ? styles.selectedTab
                          : ""
                      }
                    >
                      {server.server_name}
                    </li>
                  ))}
              </ul>
            </section>
            <Divider style={{ borderColor: "#727272" }} />
            {selectedServer && (
              <section className={styles.conentTab}>
                <h2>Chọn tập phim</h2>
                <ul className={styles.tabs}>
                  {selectedServerObject &&
                    selectedServerObject.server_data.map((episode) => (
                      <li
                        key={episode.name}
                        onClick={() => setSelectedEpisode(episode.name)}
                        className={
                          episode.name === selectedEpisode
                            ? styles.selectedTab
                            : ""
                        }
                      >
                        {episode.name}
                      </li>
                    ))}
                </ul>
              </section>
            )}

            <Divider style={{ borderColor: "#727272" }} />
            <section className={styles.conentTab}>
              <h2>Tóm tắt</h2>
              <p>{detailMovie?.movie?.content}</p>
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
                        xs={12}
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

export default WatchMoviepage;
