import styles from "./SwiperBackdrop.module.scss";
import { Link } from "react-router-dom";
import { Spin } from "antd";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import { PlayCircleOutlined } from "@ant-design/icons";
const BackdropItem = ({ url_backdrop, name, release }) => {
  // const navigate = useNavigate();
  // const handleItemClick = () => {
  //   navigate(`/movie/${movieId}/${movieTitle}`);
  // };
  return (
    <Link
      className={styles.backdrop_item}
      // to={link_url}
      // onClick={handleItemClick}
    >
      <img src={url_backdrop} alt={name} />
      <div className={styles.desc}>
        <strong>{name}</strong>
        <div className={styles.tag}>
          <PlayCircleOutlined />
          <p>Phát hành {release}</p>
        </div>
      </div>
    </Link>
  );
};

BackdropItem.propTypes = {
  url_backdrop: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
};
const SwiperBackdrop = ({ data }) => {
  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <div className={styles.swiper_thumb}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
          placement: "outsite",
          renderBullet: function (index, className) {
            return `<span class="${className}" style="background-color: white;"></span>`;
          },
        }}
        loop={true} // Kích hoạt chế độ loop
        autoplay={{
          delay: 4000, // Thời gian giữa các slide (tính bằng mili giây)
          disableOnInteraction: false, // bật/tắt autoplay khi tương tác với swiper
        }}
        speed={1500} // Đặt thời gian mỗi slide chuyển đổi
        autoHeight={true} // Thêm thuộc tính autoHeight
      >
        {data.length > 0 ? (
          data.map((item) => (
            <SwiperSlide key={item.name}>
              <BackdropItem
                url_backdrop={item.thumb_url}
                name={item.name}
                release={item.year}
              />
            </SwiperSlide>
          ))
        ) : (
          <Spin size="large" />
        )}
      </Swiper>
    </div>
  );
};
SwiperBackdrop.propTypes = {
  data: PropTypes.array,
};

export default SwiperBackdrop;
