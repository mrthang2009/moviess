import styles from "./HeaderLogo.module.scss";
import { Link } from "react-router-dom"; // Thêm useLocation từ react-router-dom

const HeaderLogo = () => {
  return (
    <>
      <Link className={styles.header_logo} to="/">
        Movies<span>T</span>
      </Link>
    </>
  );
};

export default HeaderLogo;
