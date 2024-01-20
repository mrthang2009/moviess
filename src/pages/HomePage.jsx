import styles from "./stylesPage/HomePage.module.scss"
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const DEFAULT_LIMIT = 20;
const HomePage = () => {
  const navigate = useNavigate();
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
      console.log('««««« featuredMovie »»»»»', featuredMovie);
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
        </div>
        <div className={styles.sidebar}>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
