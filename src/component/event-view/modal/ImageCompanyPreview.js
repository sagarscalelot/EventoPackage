import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import ImageAndVideoPreviewMainSlide from './ImageAndVideoPreviewMainSlide';
import dish1Image from "../../../assest/images/dish-1.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { s3Url } from '../../../config';
import ImagePreviewMainSlide from './ImagePreviewMainSlide';

function ImageCompanyPreview({ handleClose, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log("i data : ", data);
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.6)] flex z-50">
      <button type="button" onClick={() => handleClose(false)} className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"><i className="icon-close"></i></button>
      <div className="swiper-container gallery-top gallery-img relative">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {data.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-slide-container w-full flex flex-wrap max-h-[550px] h-full">
                <div className="w-full lg:w-1/2 rounded-md overflow-hidden h-full">
                  <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full" />
                </div>
                <div className="w-full lg:w-1/2 pl-10 space-y-3 h-full">
                  <p>{e.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-container gallery-thumbs bg-black mt-12 h-auto">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={10}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="flex"
          >
            {data.map((e, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-md overflow-hidden w-28 h-28 mx-auto">
                  <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full h-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ImageCompanyPreview;