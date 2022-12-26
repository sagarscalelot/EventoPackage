import React from 'react';
import bigdishImage from "../../../assest/images/big-dish.png";
import { s3Url } from '../../../config';
function ImageAndVideoPreviewMainSlide({ link, desc }) {
    console.log("link : ", desc);
    const li = s3Url + "/" + link;
    return (
        <div className="swiper-slide-container w-full flex flex-wrap max-h-[550px] h-full">
            <div className="w-full lg:w-1/2 rounded-md overflow-hidden h-full">
                <img src={li} alt="big-dish" className="w-full h-full" />
            </div>
            <div className="w-full lg:w-1/2 pl-10 space-y-3 h-full">
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default ImageAndVideoPreviewMainSlide;