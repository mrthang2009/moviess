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
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 5000, // Thời gian giữa các slide (tính bằng mili giây)
          disableOnInteraction: true, // tắt autoplay khi tương tác với swiper
        }}
      >
        {data.length > 0 ? (
          data.map((item) =>
            item.poster_url != " " ? (
              <SwiperSlide key={item._id}>
                <PosterItem
                  slug={item.slug}
                  url_poster={item.poster_url}
                  name={item.name}
                  quality={item.quality}
                  lang={item.lang}
                  typeMovie={item.type}
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
SwiperPoster.propTypes = {
  data: PropTypes.array,
};

export default SwiperPoster;
