import React from 'react';
import { s3Url } from '../../../config';

function ImagePreviewMainSlide({ link, desc }) {
    const li = s3Url + "/" + link;
    console.log("link : ", li);

    return (
        <div className="swiper-slide-container w-full flex flex-wrap h-full">
            <div className="w-full lg:w-1/2 rounded-md overflow-hidden h-full">
                <img src={li} alt="big-dish" className="w-full" />
            </div>
            <div className="w-full lg:w-1/2 pl-10 space-y-3 h-full">
                <p>{desc}</p>
            </div>
        </div>

        // <div className="swiper-slide-container h-full">
        //     <div className="rounded-md overflow-hidden w-28 h-28 mx-auto">
        //         <div className="w-full lg:w-1/2 rounded-md overflow-hidden h-full">
        //             <img src={li} alt="big-dish" className="w-full h-full" />
        //         </div>
        //         <div className="w-full lg:w-1/2 pl-10 space-y-3 h-full">
        //             <p>{desc}</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ImagePreviewMainSlide;