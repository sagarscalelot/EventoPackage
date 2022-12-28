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
        <div>
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
            className="mySwiper2 h-[calc(100vh-320px)]"
          >
            {data.map((e, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-slide-container">
                  <div className="w-full lg:w-1/2 rounded-md overflow-hidden mx-auto h-full object-cover">
                    {(e.type === "photo" ?
                      <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full h-full object-contain" /> :
                      <video width="100%" height="100%" src={s3Url + "/" + e?.url} alt="no video" controls allowFullScreen></video>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            // onSwiper={setThumbsSwiper}
            // spaceBetween={10}
            // centeredSlides={true}
            // slidesPerView={"auto"}
            // slideToClickedSlide={true}
            // loop={true}
            // modules={[FreeMode, Navigation, Thumbs]}
            // className="mySwiper mt-5"

            // onSwiper={setThumbsSwiper}
            // spaceBetween={10}
            // centeredSlides={true}
            // slidesPerView={"auto"}
            // slideToClickedSlide={true}
            // touchRatio={0.2}
            // loop={false}
            // watchSlidesProgress={true}
            // modules={[FreeMode, Navigation, Thumbs]}
            // className="mySwiper thum w-full max-w-full mt-5 bg-black"

            onSwiper={setThumbsSwiper}
            loop={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={'auto'}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper thum w-full max-w-full mt-5 bg-black"
          >
            {data.map((e, i) => (
              <SwiperSlide key={i} className="py-3">
                <div className="rounded-md overflow-hidden w-28 h-28 mx-auto mr-3">
                  {(e.type === "photo" ?
                    <img src={s3Url + "/" + e.url} alt="big-dish" className="w-full h-full object-cover" /> :
                    <video width="100%" height="100%" src={s3Url + "/" + e?.url} alt="no video" controls allowFullScreen></video>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default GalleryImageAndVideoPreview;