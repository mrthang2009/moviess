// import styles from "./stylesPage/HomePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import SwiperBackdrop from "../components/SwiperBackdrop/SwiperBackdrop";
import SwiperPoster from "../components/SwiperPoster/SwiperPoster";
import { Spin, Col, Row } from "antd";
import generateRandomInteger from "../untils/randomNumber";
import MovieSider from "../components/MovieSider/MovieSider";
const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [seriesMovie, setSeriesMovie] = useState([]);
  const [cartoon, setCartoon] = useState([]);
  const [tvShows, setTvShows] = useState([]);

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
  const getSingleMovie = useCallback(async (randomNumber) => {
    try {
      const res = await axiosClient.get(
        `/v1/api/danh-sach/phim-le?page=${randomNumber}&limit=10`
      );
      setSingleMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getSeriesMovie = useCallback(async (randomNumber) => {
    try {
      const res = await axiosClient.get(
        `/v1/api/danh-sach/phim-bo?page=${randomNumber}&limit=10`
      );
      setSeriesMovie(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getCartoon = useCallback(async (randomNumber) => {
    try {
      const res = await axiosClient.get(
        `/v1/api/danh-sach/hoat-hinh?page=${randomNumber}&limit=10`
      );
      setCartoon(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getTVShows = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/v1/api/danh-sach/tv-shows`);
      setTvShows(res.data.data);
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
      getSingleMovie(randomNumber);
      getSeriesMovie(randomNumber);
      getCartoon(randomNumber);
      getTVShows();
    }
  }, []);
  return (
    <main className="container">
      <Row gutter={16}>
        <Col span={17}>
          <section>
            <Title
              type="section"
              label="Phim mới cập nhật"
              url="/phim-moi-cap-nhat"
            />

            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.items} />
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
            <Title type="section" label="Phim lẻ" url="/phim-le" />
            {singleMovie ? (
              <SwiperPoster data={singleMovie.items} />
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
            <Title type="section" label="Phim bộ" url="/phim-bo" />
            {seriesMovie ? (
              <SwiperPoster data={seriesMovie.items} />
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
            <Title type="section" label="Hoạt hình" url="/hoat-hinh" />

            {cartoon ? (
              <SwiperPoster data={cartoon.items} />
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
          {tvShows && tvShows.items ? (
            tvShows.items
            .sort(() => Math.random() - 0.5)
            .map((item) => (
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
        </Col>
      </Row>
    </main>
  );
};

export default HomePage;
