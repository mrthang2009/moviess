// import styles from "./SwiperBackdrop.module.scss";
// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import CSS của Swiper
import { Card } from "antd";

const { Meta } = Card;

const SwiperBackdrop = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="your-image-url-1.jpg" />}
        >
          <Meta title="Card title 1" description="Description 1" />
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="your-image-url-2.jpg" />}
        >
          <Meta title="Card title 2" description="Description 2" />
        </Card>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperBackdrop;

