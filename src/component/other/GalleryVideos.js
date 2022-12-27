import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                <div className="container">
                    {console.log(gallery)}

                    {gallery.map(e => (
                        <figure>
                            <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                                <a href="#" className="relative inset-0 w-full h-full opacity-100 pointer-events-auto" onClick={() => setPreview(true)}>

                                    <iframe width="100%" src={s3Url + "/" + e?.url} title="YouTube video player" frameBorder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </a>
                                <button onClick={() => {
                                    setIsVideoPlayerPopUpOpen(true)
                                    setVideoUrl(s3Url + "/" + e?.url);
                                }}
                                    className="w-10 h-10 flex justify-center items-center bg-black rounded-full anim absolute bottom-0 right-0 hover:opacity-75">
                                    <i className='icon-play text-2xl'></i>
                                </button>
                            </div>
                        </figure>
                    ))}
                </div>
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