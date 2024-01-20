import styles from "./NavigationBar.module.scss";
import { NavsList } from "../../datas/NavsList";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ item }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPageName = item.url === currentPath;

  return (
    <a href={item.url} className={currentPageName ? styles.active : ""}>
      {/* Thêm icon tại đây, ví dụ: <i className={item.icon}></i> */}
      <span>{item.name}</span>
    </a>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    // Có thể thêm PropTypes cho icon tại đây nếu cần
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const NavigationBar = () => {
  return (
    <div className={styles.main_navigation}>
      {NavsList.map((item) => (
        <NavItem item={item} key={item.name} />
      ))}
    </div>
  );
};

export default NavigationBar;
