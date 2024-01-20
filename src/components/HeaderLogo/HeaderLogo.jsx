import styles from "./HeaderLogo.module.scss";

const HeaderLogo = () => {
  return (
    <>
      <a className={styles.header_logo} href="/">
        Movies<span>VENNIE</span>
      </a>
    </>
  );
};

export default HeaderLogo;