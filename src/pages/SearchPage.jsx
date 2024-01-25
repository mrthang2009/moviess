import styles from "./stylesPage/SearchPage.module.scss";
import axiosClient from "../libraries/axiosClient";
import { useEffect, useState, useCallback } from "react";
import Title from "../components/Title/Title";
import MovieSider from "../components/MovieSider/MovieSider";
import { Pagination, Spin, Col, Row } from "antd";
import PosterItem from "../components/PosterItem/PosterItem";
import { useSearchParams, useNavigate } from "react-router-dom";
const LIMIT_PAGE = 24;

const SearchPage = () => {
  const navigate = useNavigate();

  const [tvShows, setTvShows] = useState([]);
  const [search, setSearch] = useState([]);
  const [params] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const keywordParam = params.get("keyword") || "";
    setSearchValue(keywordParam.replace(/-/g, " "));
  }, [params]);

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
  const getSearch = useCallback(async (searchValue) => {
    try {
      const res = await axiosClient.get(
        `/v1/api/tim-kiem?keyword=${searchValue}`
      );
      setSearch(res.data.data);
      if (
        res &&
        res.data &&
        res.data.data &&
        res.data.data.params &&
        res.data.data.params.pagination
      ) {
        setPagination((prev) => ({
          ...prev,
          total: res.data.data.params.pagination.totalItems,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTVShows();
    getSearch(searchValue);
  }, [searchValue]);
  const paginateData = (data, page, pageSize) => {
    if (!data) {
      return [];
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = paginateData(search.items, pagination.page, LIMIT_PAGE);

  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));

      params.set("page", page);
      navigate({ search: `?${params.toString()}` });
    },
    [params]
  );

  return (
    <main className="container">
      <Row gutter={20}>
        <Col span={17}>
          <Title label={`Kết quả tìm kiếm: ${searchValue}`} />
          <Row gutter={[16, 16]}>
            {search && search.items ? (
              search.items.length > 0 ? (
                paginatedData.map((item) => (
                  <Col span={4} key={item._id}>
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
                    fontSize: "120%",
                    marginLeft: "60px",
                    color: "#727272",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>
                    Không có kết quả nào để hiển thị với{" "}
                    <span>{searchValue}</span>
                  </p>
                  <strong>Gợi ý:</strong>
                  <ul style={{ marginLeft: "100px" }}>
                    <li>Hãy chắc chắn rằng tất cả các từ đều đúng chính tả.</li>
                    <li>Hãy thử các từ khóa khác nhau.</li>
                    <li>Thử những từ khóa thông thường hơn.</li>
                  </ul>
                </div>
              )
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

          {search && search.items && search.items.length > LIMIT_PAGE && (
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
          )}
        </Col>
        <Col span={7}>
          {/* <Title label="Shows truyền hình" /> */}
          {/* <div className={styles.list_movie_sider}> */}
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
          {/* </div> */}
        </Col>
      </Row>
    </main>
  );
};

export default SearchPage;
