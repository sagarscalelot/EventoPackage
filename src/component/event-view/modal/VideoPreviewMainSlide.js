import React from 'react';
import { s3Url } from '../../../config';

function VideoPreviewMainSlide({ link, desc }) {
    console.log("link : ", desc);
    const li = s3Url + "/" + link;
    return (
        <div className="swiper-slide-container w-full flex flex-wrap">
            <div className="w-full lg:w-1/2 rounded-md overflow-hidden">
            <video width="100%" height="100%" src={li} alt="no video" controls allowFullScreen></video>
            </div>
            <div className="w-full lg:w-1/2 pl-10 space-y-3">
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default VideoPreviewMainSlide;