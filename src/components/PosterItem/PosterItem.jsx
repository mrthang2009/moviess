import styles from "./PosterItem.module.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";

const PosterItem = ({
  slug,
  typeMovie,
  url_poster,
  name,
  type,
  quality,
  lang,
}) => {
  
  let converTypeMovie = "";

  if (typeMovie === "single") {
    converTypeMovie = "phim-le";
  } else if (typeMovie === "series") {
    converTypeMovie = "phim-bo";
  } else if (typeMovie === "hoathinh") {
    converTypeMovie = "hoat-hinh";
  } else if (typeMovie === "tvshows") {
    converTypeMovie = "tv-shows";
  }
  const navigate = useNavigate();
  const handleItemClick = () => {
    if (type == "featuredMovie") {
      navigate(`/${slug}`);
    } else {
      navigate(`/${converTypeMovie}/${slug}`);
    }
  };
  return (
    <a
      className={styles.poster_item}
      href={
        type == "featuredMovie" ? `/${slug}` : `/${converTypeMovie}/${slug}`
      }
      onClick={handleItemClick}
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
    </a>
  );
};
PosterItem.propTypes = {
  slug: PropTypes.string.isRequired,
  url_poster: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quality: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
  typeMovie: PropTypes.string,
};

export default PosterItem;
