import React from 'react';
import bigdishImage from "../../../assest/images/big-dish.png";
import { s3Url } from '../../../config';
function ImageAndVideoPreviewMainSlide({ link, desc }) {
    console.log("link : ", desc);
    const li = s3Url + "/" + link;
    return (
        <div className="swiper-slide-container w-full flex flex-wrap">
            <div className="w-full lg:w-1/2 rounded-md overflow-hidden">
                <img src={li} alt="big-dish" className="w-full" />
            </div>
            <div className="w-full lg:w-1/2 pl-10 space-y-3">
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default ImageAndVideoPreviewMainSlide;