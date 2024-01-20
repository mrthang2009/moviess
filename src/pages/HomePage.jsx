import styles from "./stylesPage/HomePage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState([]);

  const getFeaturedMovie = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        `/danh-sach/phim-moi-cap-nhat?page=1&limit=20`
      );
      setFeaturedMovie(res.data.payload);
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
        <div className={styles.main_content}></div>
        <div className={styles.sidebar}></div>
      </div>
    </main>
  );
};

export default HomePage;
