import React, { useState } from "react";
import bigDishImage from "../../../assest/images/big-dish.png";
import dish1Image from "../../../assest/images/dish-1.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import 'swiper/css/bundle';
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { s3Url } from "../../../config";


function GalleryImageAndVideoPreview({ handleClose, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
      <button
        type="button"
        onClick={() => handleClose(false)}
        className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"
      >
        <i className="icon-close"></i>
      </button>
      <div className="relative w-full py-10">
        <div className="max-w-3xl mx-auto px-12">
          <h2 className="text-white">Sweet Love Catering</h2>
          <p className="text-lg text-white font-normal">Catering</p>
        </div>
        <div className="swiper-container gallery-top gallery-img relative">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            centeredSlides={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          >
            {data.map((e, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-slide-container max-h-[550px]">
                  <div className="w-full lg:w-1/2 rounded-md overflow-hidden mx-auto h-full object-cover">
                    {(e.type === "photo" ?
                      <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full h-full" /> :
                      <video width="100%" height="100%" src={s3Url + "/" + e?.url} alt="no video" controls allowFullScreen></video>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-container sw2 gallery-thumbs bg-black h-auto mt-12">
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
                    {(e.type === "photo" ?
                      <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full h-full" /> :
                      <video width="100%" height="100%" src={s3Url + "/" + e?.url} alt="no video" controls allowFullScreen></video>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div >
    </div >
  );
}

export default GalleryImageAndVideoPreview;