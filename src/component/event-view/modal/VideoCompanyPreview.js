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
import VideoPreviewMainSlide from './VideoPreviewMainSlide';

function VideoCompanyPreview({ handleClose, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
      <button type="button" onClick={() => handleClose(false)} className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"><i className="icon-close"></i></button>
      <div className="swiper-container gallery-top gallery-img flex justify-center items-center relative">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          centeredSlides={false}
          spaceBetween={10}
          navigation={true}
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        >
          {data.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-slide-container w-full flex items-center justify-center flex-wrap max-h-[600px] h-full">
                <div className="w-full lg:w-1/2 rounded-md overflow-hidden h-full">
                  <video src={s3Url + "/" + e.url} alt="no video" controls allowFullScreen></video>
                </div>
                <div className="w-full lg:w-1/2 pl-10 space-y-3 h-full">
                  <p>{e.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="swiper-container gallery-thumbs bg-black mt-12 h-auto">
          <Swiper
            onSwiper={setThumbsSwiper}
            centeredSlides={true}
            slidesPerView={'auto'}
            touchRatio={0.2}
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
        </div> */}
      </div>
    </div>
  )
}

export default VideoCompanyPreview;