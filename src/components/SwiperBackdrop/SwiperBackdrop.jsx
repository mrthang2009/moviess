import styles from "./SwiperBackdrop.module.scss";
import { useNavigate } from "react-router-dom";
import { Spin, Tag } from "antd";
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
const BackdropItem = ({ slug, url_backdrop, name, release }) => {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/${slug}`);
  };
  return (
    <a
      className={styles.backdrop_item}
      href={`/${slug}`}
      onClick={handleItemClick}
    >
      <img src={url_backdrop} alt={name} />
      <Tag className={styles.tag_hot}>Nổi bật</Tag>
      <div className={styles.desc}>
        <strong>{name}</strong>
        <div className={styles.tag}>
          <PlayCircleOutlined />
          <p>Phát hành {release}</p>
        </div>
      </div>
    </a>
  );
};

BackdropItem.propTypes = {
  url_backdrop: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  release: PropTypes.number.isRequired,
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
          data.map((item) =>
            item.thumb_url != " " ? (
              <SwiperSlide key={item.name}>
                <BackdropItem
                  slug={item.slug}
                  url_backdrop={item.thumb_url}
                  name={item.name}
                  release={item.year}
                />
              </SwiperSlide>
            ) : null
          )
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </Swiper>
    </div>
  );
};
SwiperBackdrop.propTypes = {
  data: PropTypes.array,
};

export default SwiperBackdrop;
