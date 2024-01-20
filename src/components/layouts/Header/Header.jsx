import styles from "./Header.module.scss";

import HeaderLogo from "../../HeaderLogo/HeaderLogo";
import NavigationBar from "../../NavigationBar/NavigationBar";
import SearchBox from "../../SearchBox/SearchBox";




const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_middle}>
          <HeaderLogo/>
          <SearchBox/>
        </div>
        <div className={styles.navbar}>
        <NavigationBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
