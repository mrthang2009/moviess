import styles from "./Header.module.scss";
import HeaderLogo from "../../HeaderLogo/HeaderLogo";
import NavigationBar from "../../NavigationBar/NavigationBar";
import SearchBox from "../../SearchBox/SearchBox";
const Header = () => {
  return (
    <div className="container">
      <div className={styles.header_middle}>
        <HeaderLogo />

        <NavigationBar />

        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
