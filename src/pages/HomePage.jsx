import styles from "./stylesPages/HomePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import SwiperMovies from "../components/SwiperMovies/SwiperMovies";
import Title from "../components/Title/Title";
import SwiperBackdrop from "../components/SwiperBackdrop/SwiperBackdrop";
import Loading from "../components/Loading/Loading";
import GenresFilter from "../components/GenresFilter/GenresFilter";
import Button from "../components/Button/Button";
import MovieListSidebar from "../components/MovieListSidebar/MovieListSidebar";

const DEFAULT_LIMIT = 20;
const HomePage = () => {
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [featuredMovie, setFeaturedMovie] = useState([]);

  const getFeaturedMovie = useCallback(async (pagination) => {
    try {
      const res = await axiosClient.get(
        `/categories?page=${pagination.page}&pageSize=${pagination.pageSize}`
      );
      setFeaturedMovie(res.data.payload);
      setPagination((prev) => ({
        ...prev,
        total: res.data.totalCategory,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getFeaturedMovie(pagination);
    if (pagination.page === 1) {
      navigate(`/categories`);
    } else {
      navigate(`/categories?page=${pagination.page}`);
    }
  }, [navigate, pagination.page, pagination.pageSize]);
  return (
    <main className="container">
      <div className={styles.box_main}>
        <div className={styles.main_content}>
          <section className={styles.section_one}>
            <Title
              type="section_title"
              lable="Now Playing Movies"
              url="/nowplaying"
            />
            {dataNowPlaying ? (
              <SwiperBackdrop data={dataNowPlaying.results} />
            ) : (
              <Loading />
            )}
          </section>
          <section className={styles.section_two}>
            <Title type="section_title" lable="Popular Movies" url="/popular" />
            {dataPopular ? (
              <SwiperMovies data={dataPopular.results} />
            ) : (
              <Loading />
            )}
          </section>
          <section className={styles.section_three}>
            <Title
              type="section_title"
              lable="Top Rated Movies"
              url="/toprated"
            />
            {dataTopRate ? (
              <SwiperMovies data={dataTopRate.results} />
            ) : (
              <Loading />
            )}
          </section>
          <section className={styles.section_fore}>
            <Title
              type="section_title"
              lable="Upcoming Movies"
              url="/upcoming"
            />
            {dataUpComing ? (
              <SwiperMovies data={dataUpComing.results} />
            ) : (
              <Loading />
            )}
          </section>
        </div>
        <div className={styles.sidebar}>
          <section className={styles.filter}>
            <div className={styles.genres}>
              <Title type="sidebar_title" lable="Filter by genres" />
              {genres ? <GenresFilter data={genres} /> : <Loading />}
            </div>
            <Button label="Filter" type="filter" />
          </section>
          <section className={styles.extend}>
            <div className={styles.title}>
              <Title type="sidebar_title" lable="Now Playing Movies" />
              <Button type="option" label="See more" link_url="/nowplaying" />
            </div>
            <ul className={styles.movie_extend_list}>
              {dataNowPlayingSidebar ? (
                <MovieListSidebar data={dataNowPlayingSidebar.results} />
              ) : (
                <Loading />
              )}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
