import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImagePreviewMainSlide from './ImagePreviewMainSlide';

function ImageCompanyPreview({ handleClose, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log("i data : ", data);
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.6)] flex z-50">
      <button type="button" onClick={() => handleClose(false)} className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"><i className="icon-close"></i></button>

      <div className="relative w-full py-10">
        <div className="swiper-container gallery-top relative">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            centeredSlides={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
          >
            {data.map((e,i) => (
              <SwiperSlide key={i}>
                 <ImagePreviewMainSlide link={e.url} desc={e.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-container gallery-thumbs bg-black">

          <Swiper
            onSwiper={setThumbsSwiper}
            centeredSlides={true}
            slidesPerView={'auto'}
            touchRatio={0.2}
            freeMode={true}
            slideToClickedSlide={true}
            loopedSlides={4}
            spaceBetween={10}
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