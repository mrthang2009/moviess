import styles from "./PosterItem.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlayCircleOutlined } from "@ant-design/icons";

const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";

const PosterItem = ({ url_poster, name, type, quality, lang }) => {
  // const navigate = useNavigate();
  // const handleItemClick = () => {
  //   navigate(`/${movieTitle}`);
  // };
  return (
    <Link
      className={styles.poster_item}
      // to={link_url}
      // onClick={handleItemClick}
    >
      <div className={styles.card_cover}>
        <div className={styles.card_imane}>
          <img
            src={
              type == "featuredMovie"
                ? `${url_poster}`
                : `${APP_DOMAIN_CDN_IMAGE}${url_poster}`
            }
            alt={name}
          />
          {type == "featuredMovie" ? (
            <div className={styles.tag_hot}>
              <small>Nổi bật</small>
            </div>
          ) : (
            <div className={styles.tags}>
              <small>{quality}</small>
              <small>{lang}</small>
            </div>
          )}
        </div>
        <div className={styles.play_icon}>
          <PlayCircleOutlined />
        </div>
      </div>
      <div className={styles.name_poster}>{name}</div>
    </Link>
  );
};
PosterItem.propTypes = {
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quality: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
};

export default PosterItem;
