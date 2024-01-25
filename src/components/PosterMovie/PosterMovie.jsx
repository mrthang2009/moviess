import styles from "./PosterMovie.module.scss";
import PropTypes from "prop-types";
import { Col, Row, Tag } from "antd";

const PosterMovie = ({
  url_backdrop,
  url_poster,
  name,
  origin_name,
  release,
  country,
  category,
  time,
}) => {
  return (
    <div className={styles.poster_movie}>
      {url_backdrop == "" ? null : <img src={url_backdrop} alt={name} />}
      <Row gutter={[28, 0]} className={styles.desc}>
        <Col span={8} className={styles.thumb}>
          <img src={url_poster} alt={name} />
        </Col>
        <Col span={16} className={styles.information}>
          <h1>{name}</h1>
          <h2>{origin_name}</h2>
          <span>Phát hành {release}</span>
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
          <p>Thời gian: {time}</p>
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
  release: PropTypes.number.isRequired,
  country: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
  time: PropTypes.array.isRequired,
};

export default PosterMovie;
