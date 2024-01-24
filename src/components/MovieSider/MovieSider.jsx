import styles from "./MovieSider.module.scss";
import PropTypes from "prop-types";

const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";

const MovieSider = ({ url_backdrop, name, realese }) => {
  return (
    <a
      className={styles.movie_item_sidebar}
      //   href={link_url}
      //   onClick={handleItemClick}
    >
      <div className={styles.thumb}>
        <img src={`${APP_DOMAIN_CDN_IMAGE}${url_backdrop}`} alt={name} />
      </div>
      <div className={styles.desc}>
        <strong>{name}</strong>
        <p>{realese}</p>
      </div>
    </a>
  );
};
MovieSider.propTypes = {
  url_backdrop: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  realese: PropTypes.number.isRequired,
};
export default MovieSider;
