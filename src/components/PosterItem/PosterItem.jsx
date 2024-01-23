import styles from "./PosterItem.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";
import { Card } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
const { Meta } = Card;
const PosterItem = ({ url_poster, name, release }) => {
  // const navigate = useNavigate();
  // const handleItemClick = () => {
  //   navigate(`/movie/${movieId}/${movieTitle}`);
  // };
  return (
    <Link
      className={styles.poster_item}
      // to={link_url}
      // onClick={handleItemClick}
    >
      <Card
        hoverable
        cover={
          <div className={styles.card_cover}>
            <img
              className={styles.poster_image}
              src={`${APP_DOMAIN_CDN_IMAGE}${url_poster}`}
              alt={name}
            />
            <div className={styles.play_icon}>
              <PlayCircleOutlined />
            </div>
          </div>
        }
      >
        <Meta title={name} description={release} />
      </Card>
    </Link>
  );
};
PosterItem.propTypes = {
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
};

export default PosterItem;
