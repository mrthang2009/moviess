import styles from "./Header.module.scss";

import HeaderLogo from "../../HeaderLogo/HeaderLogo";
import NavigationBar from "../../NavigationBar/NavigationBar";
import SearchBox from "../../SearchBox/SearchBox";

const Header = () => {
  return (
    <header className="container">
      <div className={styles.header_middle}>
        <HeaderLogo />
        <NavigationBar />
        <SearchBox />
      </div>
    </header>
  );
};

export default Header;
