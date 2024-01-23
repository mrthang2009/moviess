import { useState } from "react";
import { Button } from "antd";
import styles from "./Title.module.scss";
import PropTypes from "prop-types";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";

const Title = ({ label, url, type }) => {
  const [loadings, setLoadings] = useState([]);
  return (
    <div className={styles.title}>
      <h2>
        {type === "section" ? <CaretRightOutlined /> : <CaretDownOutlined />}
        {label}
      </h2>
      {type === "section" ? (
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
      ) : (
        ""
      )}
    </div>
  );
};
Title.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
};
export default Title;
