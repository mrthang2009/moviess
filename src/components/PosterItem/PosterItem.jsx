import styles from "./PosterItem.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlayCircleOutlined } from "@ant-design/icons";

const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";

const PosterItem = ({ url_poster, name, type }) => {
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
      <div className={styles.card_cover}>
        <img
          src={
            type == "featuredMovie"
              ? `${url_poster}`
              : `${APP_DOMAIN_CDN_IMAGE}${url_poster}`
          }
          alt={name}
        />
        <div className={styles.play_icon}>
          <PlayCircleOutlined />
        </div>
      </div>
      <div className={styles.name_poster}>
        {name}
      </div>
    </Link>
  );
};
PosterItem.propTypes = {
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default PosterItem;
