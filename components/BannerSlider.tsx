"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import img1 from "../public/assets/google-search.jpg";
import img2 from "../public/assets/notification.jpg";
import img3 from "../public/assets/sale.jpg";

import Image from "next/image";

const array = [img1, img2, img3];

const BannerSlider = () => {
  return (
    <Swiper
      modules={[EffectCoverflow,Autoplay]}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className="mt-6"
    >
      {array.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            width={800}
            height={800}
            alt={`Image ${index}`}
            className="rounded-xl w-full h-[200px]  object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
