import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gallery1Image from "../../assest/images/gallery-1.png";
import gallery2Image from "../../assest/images/gallery-2.png";
import gallery3Image from "../../assest/images/gallery-3.png";
import gallery5Image from "../../assest/images/gallery-5.png";
import GalleryImageAndVideoPreview from './modal/GalleryImageAndVideoPreview';
import Modal from '../modal/Modal';
import { baseUrl, s3Url } from '../../config';
import VideoPlayer from '../landing_page/popup/VideoPlayer'

function GalleryVideos() {
    const [preview, setPreview] = useState(false);
    const [isVideoPlayerPopUpOpen, setIsVideoPlayerPopUpOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const [gallery, setGallery] = useState([]);
    const token = localStorage.getItem("Token");

    const header = {
        'Authorization': `Token ${token}`
    }
    const getGallery = async () => {
        try {
            const response = await axios.get(`${baseUrl}/organizer/gallery`, { headers: header });
            console.log("Full Gallery video: ", response.data.Data.filter(video => (video.type === "video")));
            setGallery(response.data.Data.filter(video => (video.type === "video")));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGallery();
    }, []);

    return (
        <>
        <div className="w-full relative" id="video">
            <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {gallery.map(e => (

                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                        {/* <div className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onclick={() => setPreview(true)}> */}
                                <iframe width="100%" height="100%" src={s3Url + "/" + e?.url} title="YouTube video player" frameBorder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <button onClick={()=> {
                    setIsVideoPlayerPopUpOpen(true)
                    setVideoUrl(s3Url + "/" + e?.url);
                  }} className="w-12 h-12 flex justify-center items-center bg-spiroDiscoBall anim absolute bottom-0 right-0 hover:opacity-75">
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0L17 10L0 20V0Z" fill="white" />
                    </svg>
                  </button>
                            {/* </div> */}
                         </div>
                    </li>

            ))}   

                {/* <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery1Image} alt="galrry-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onclick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
                        </div>
                    </li>
                </ul> */}
                {/* <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery3Image} alt="galrry-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onclick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
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
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onclick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
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
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onclick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
                        </div>
                    </li>
                </ul> */}
            </div >
        </div >
            <Modal isOpen={preview} >
                <GalleryImageAndVideoPreview handleClose={setPreview} />
            </Modal>
            <Modal isOpen={isVideoPlayerPopUpOpen} >
              
              <VideoPlayer handleClose={setIsVideoPlayerPopUpOpen} videoUrl={videoUrl} />

          </Modal>
        </>
    )
}

export default GalleryVideos;
