import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const InfiniteImageSlider = ({ images }) => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center overflow-hidden">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="w-full h-full px-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-full h-[300px] flex justify-center items-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteImageSlider;
