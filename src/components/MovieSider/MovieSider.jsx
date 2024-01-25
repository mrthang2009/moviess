import styles from "./MovieSider.module.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const APP_DOMAIN_CDN_IMAGE = "https://img.phimapi.com/";

const MovieSider = ({slug, url_backdrop, name, realese }) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/${slug}`);
  };
  return (
    <a
      className={styles.movie_item_sidebar}
      href={`/${slug}`}
      onClick={handleItemClick}
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
  slug: PropTypes.number.isRequired,
};
export default MovieSider;
