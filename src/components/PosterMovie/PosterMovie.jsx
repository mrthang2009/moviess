import styles from "./PosterMovie.module.scss";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

const PosterMovie = ({ url_backdrop, url_poster, name, release }) => {
  return (
    <div className={styles.poster_movie}>
      <div className={styles.background}>
        <img src={url_backdrop} alt={name} />
      </div>
      <Row gutter={16}>
        <Col span={7}>
          <div className={styles.thumb}>
            <img src={url_poster} alt={name} />
          </div>
        </Col>
        <Col span={17}>
          <div className={styles.information}>
            <h2>{name}</h2>

            <span>Released {release}</span>

            <p>Genres: </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
PosterMovie.propTypes = {
  url_backdrop: PropTypes.string.isRequired,
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quality: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
  release: PropTypes.number.isRequired,
};

export default PosterMovie;
