import styles from "./stylesPage/HomePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import SwiperBackdrop from "../components/SwiperBackdrop/SwiperBackdrop";
import { Spin } from "antd";
const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState([]);

  const getFeaturedMovie = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        `/danh-sach/phim-moi-cap-nhat?page=1&limit=20`
      );
      setFeaturedMovie(res);
      console.log("««««« featuredMovie »»»»»", featuredMovie);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getFeaturedMovie();
  }, []);
  return (
    <main className="container">
      <div className={styles.box_main}>
        <div className={styles.content}>
          <section className={styles.section_one}>
            <Title label="Phim mới cập nhật" url="/phim-moi-cap-nhat" />
            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.results} />
            ) : (
              <Spin size="large" />
            )}
          </section>
          <section className={styles.section_tow}>
            <Title label="Phim lẻ" url="/phim-le" />
            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.results} />
            ) : (
              <Spin size="large" />
            )}
          </section>
          <section className={styles.section_tow}>
            <Title label="Phim bộ" url="/phim-bo" />
            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.results} />
            ) : (
              <Spin size="large" />
            )}
          </section>
          <section className={styles.section_one}>
            <Title label="Hoạt hình" url="/hoat-hinh" />
            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.results} />
            ) : (
              <Spin size="large" />
            )}
          </section>
          <section className={styles.section_tow}>
            <Title label="TV Shows" url="/tv-shows" />
            {featuredMovie ? (
              <SwiperBackdrop data={featuredMovie.results} />
            ) : (
              <Spin size="large" />
            )}
          </section>
        </div>
        <div className={styles.sidebar}>ajvcahc ạcbadgvubkbk</div>
      </div>
    </main>
  );
};

export default HomePage;
