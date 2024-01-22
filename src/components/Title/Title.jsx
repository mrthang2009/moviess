import { useState } from "react";
import { Button } from "antd";
import styles from "./Title.module.scss";
import PropTypes from "prop-types";
const Title = ({ label, url }) => {
  const [loadings, setLoadings] = useState([]);
  return (
    <div className={styles.title}>
      <h3>{label}</h3>
      <Button
        type="primary"
        style={{ backgroundColor: "orange", border: "none" }}
        loading={loadings[0]}
        onClick={() => setLoadings(!loadings)}
      >
        <a style={{ color: "whte" }} href={url}>
          Xem thêm
        </a>
      </Button>
    </div>
  );
};
Title.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};
export default Title;
