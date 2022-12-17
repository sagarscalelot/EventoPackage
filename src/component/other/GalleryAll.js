import React, { useState } from 'react';
import gallery1Image from "../../assest/images/gallery-1.png";
import gallery2Image from "../../assest/images/gallery-2.png";
import gallery3Image from "../../assest/images/gallery-3.png";
import gallery4Image from "../../assest/images/gallery-4.png";
import gallery5Image from "../../assest/images/gallery-5.png";
import gallery6Image from "../../assest/images/gallery-6.png";
import GalleryImageAndVideoPreview from './modal/GalleryImageAndVideoPreview';
import Modal from '../modal/Modal';
import { s3Url } from '../../config';

function GalleryAll({imageList, videoList}) {
    const [preview, setPreview] = useState(false);


    // console.log("Bengaluru, Karnataka",(imageList && imageList?.photos[0].url && imageList?.photos[0].url !=="") ? (s3Url+"/"+imageList[0]?.url)  :gallery1Image);

 console.log("Bengaluru, Karnataka",imageList.url);


    return (
        
        <div className="w-full relative tab-main active" id="all">
 {imageList?.map( (url, index) => (
            <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={(imageList && imageList[0]?.url && imageList[0]?.url !=="") ? (s3Url+"/"+imageList[0]?.url)  
                                   :gallery1Image} alt="gallery-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                        </div>  
                    </li>
                    <li className="image-card" onClick={() => setPreview(true)}>
                        <div>
                            <img src={(imageList && imageList[1]?.url && imageList[0]?.url !=="") ? (s3Url+"/"+imageList[0]?.url)  
                            :gallery1Image} alt="gallery-2" className="w-full" />
                        </div>
                    </li>
                </ul>
                <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery3Image} alt="galrry-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                            
                        </div>
                    </li>
                    <li className="image-card">
                        <div>
                            <img src={gallery4Image} alt="gallery-5" className="w-full" />
                        </div>
                    </li>
                </ul>
                <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery5Image} alt="galrry-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                           
                        </div>
                    </li>
                    <li className="image-card">
                        <div>
                            <img src={gallery6Image} alt="gallery-4" className="w-full" />
                        </div>
                    </li>
                </ul>
                <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery2Image} alt="galrry-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                            
                        </div>
                    </li>
                    <li className="image-card">
                        <div>
                            <img src={gallery3Image} alt="gallery-3" className="w-full" />
                        </div>
                    </li>
                </ul>
            </div>
            ))}
            <Modal isOpen={preview} >
                <GalleryImageAndVideoPreview handleClose={setPreview} />
            </Modal>
        </div>
    )
}

export default GalleryAll;
