import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import ImageAndVideoPreviewMainSlide from './ImageAndVideoPreviewMainSlide';
import dish1Image from "../../../assest/images/dish-1.png";
import "swiper/css";
import 'swiper/css/bundle';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { s3Url } from '../../../config';
import ImagePreviewMainSlide from './ImagePreviewMainSlide';
function ImagePreview({ handleClose, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex z-50">
      <button type="button" onClick={() => handleClose(false)} className="absolute right-10 top-10 z-50 rounded-full text-white text-lg"><i className="icon-close"></i></button>
      <div className="relative w-full py-10">
        <div className="swiper-container gallery-top relative">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs]}
          >
            {data.map(e => (
              <SwiperSlide>

                <ImagePreviewMainSlide link={e.url} desc={e.description} />
              </SwiperSlide>

            ))}
            {/* <div className="rounded-md overflow-hidden"><img src={dish1Image} alt="/dish-1" width={100} height={100} /> </div> */}
          </Swiper>

        </div>
        <div className="swiper-container gallery-thumbs bg-black">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}

            freeMode={true}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
          // onSwiper={setThumbsSwiper}
          >
            {data.map(e => (
              <SwiperSlide>
                <ImagePreviewMainSlide link={e.url} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ImagePreview;