import styles from "./SwiperPoster.module.scss";
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
import "swiper/css/scrollbar";
import PropTypes from "prop-types";
import PosterItem from "../PosterItem/PosterItem";
const SwiperPoster = ({ data }) => {
  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <div className={styles.swiper_poster}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation
        loop={true} // Kích hoạt chế độ loop
        breakpoints={{
          // Thiết lập số lượng slide trên mỗi breakpoint
          425: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        autoplay={{
          delay: 5000, // Thời gian giữa các slide (tính bằng mili giây)
          disableOnInteraction: true, // tắt autoplay khi tương tác với swiper
        }}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <SwiperSlide key={item._id}>
              <PosterItem
                url_poster={item.poster_url}
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
SwiperPoster.propTypes = {
  data: PropTypes.array,
};

export default SwiperPoster;