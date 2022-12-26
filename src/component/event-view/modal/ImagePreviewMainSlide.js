import React from 'react';
import { s3Url } from '../../../config';

function ImagePreviewMainSlide({ link, desc }) {
    const li = s3Url + "/" + link;
    console.log("link : ", li);

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

export default ImagePreviewMainSlide;