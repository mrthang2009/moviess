import { useState } from "react";
import { Button } from "antd";
import styles from "./Title.module.scss";
import PropTypes from "prop-types";
const Title = ({ label, url }) => {
  const [loadings, setLoadings] = useState([]);
  return (
    <div className={styles.title}>
      <h1>{label}</h1>
      <Button
        type="primary"
        loading={loadings[0]}
        onClick={() => setLoadings(!loadings)}
      >
        <a href={url}>Xem thêm</a>
      </Button>
    </div>
  );
};
Title.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};
export default Title;
