import styles from "./PosterMovie.module.scss";
import PropTypes from "prop-types";
import { Col, Row, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
const PosterMovie = ({
  url_backdrop,
  url_poster,
  name,
  origin_name,
  release,
  country,
  category,
  time,
  type,
  quality,
  lang,
  status,
  episode_current,
  episode_total,
  slug
}) => {
  const navigate = useNavigate();
  const hanldClick = () => {
    navigate(`/xem-phim/${slug}`);
  };
  return (
    <div className={styles.poster_movie}>
      {url_backdrop == "" ? null : <img src={url_backdrop} alt={name} />}
      <Row gutter={[10, 0]} className={styles.desc}>
        <Col span={8} className={styles.thumb}>
          <img src={url_poster} alt={name} />
        </Col>
        <Col span={16} className={styles.information}>
          <h1>{name}</h1>
          <h2>{origin_name}</h2>
          <Tag className={styles.tags}>{`${quality} ${lang}`}</Tag>
          {type == "series" ? (
            status == "completed" ? (
              <Tag
                className={styles.tags}
              >{`Đã cập nhật trọn bộ ${episode_total}/${episode_total} tập`}</Tag>
            ) : (
              <Tag
                className={styles.tags}
              >{`Đang cập nhật ${episode_current}/${episode_total} tập`}</Tag>
            )
          ) : null}
          <p>Phát hành: {release}</p>
          {country ? (
            <div className={styles.country}>
              <p>Quốc gia:</p>
              <ul>
                {country.map((item) => (
                  <li key={item.id}>
                    <Tag className="ant-tag">{item.name}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {category ? (
            <div className={styles.category}>
              <p>Thể loại: </p>
              <ul>
                {category.map((item) => (
                  <li key={item.id}>
                    {" "}
                    <Tag className="ant-tag">{item.name}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p>Thời gian: {time}</p>
          <Button
            type="primary"
            danger
            style={{ fontWeight: "bold" }}
            onClick={hanldClick}
          >
            XEM PHIM
          </Button>
        </Col>
      </Row>
    </div>
  );
};
PosterMovie.propTypes = {
  url_backdrop: PropTypes.string.isRequired,
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  origin_name: PropTypes.string.isRequired,
  quality: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.string,
  episode_current: PropTypes.string,
  episode_total: PropTypes.string,
  release: PropTypes.number,
  country: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  time: PropTypes.string,
  slug: PropTypes.string,
};

export default PosterMovie;
