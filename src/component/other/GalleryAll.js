import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gallery1Image from "../../assest/images/gallery-1.png";
import gallery2Image from "../../assest/images/gallery-2.png";
import gallery3Image from "../../assest/images/gallery-3.png";
import gallery4Image from "../../assest/images/gallery-4.png";
import gallery5Image from "../../assest/images/gallery-5.png";
import gallery6Image from "../../assest/images/gallery-6.png";
import GalleryImageAndVideoPreview from './modal/GalleryImageAndVideoPreview';
import Modal from '../modal/Modal';
import { baseUrl, s3Url } from '../../config';


function GalleryAll() {
    const [preview, setPreview] = useState(false);

    const [gallery, setGallery] = useState([]);
    const token = localStorage.getItem("Token");

    const header = {
        'Authorization': `Token ${token}`
    }
    const getGallery = async () => {
        try {
            const response = await axios.get(`${baseUrl}/organizer/gallery`, { headers: header });
            console.log("Full Gallery : ", response.data.Data);
            setGallery(response.data.Data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGallery();
    }, []);

    return (
        <div className="w-full relative tab-main active" id="all">
            <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
<<<<<<< HEAD
                <ul className="space-y-8">
                    <li id="video-card" className="text-sm leading-6">
                        <div className="bg-white rounded-md relative overflow-hidden w-full h-full">
                            <div className="relative pointer-events-none video-cover anim z-10">
                                <img src={gallery1Image} alt="gallery-1" className="w-full" />
                                <a href="#" className="absolute bottom-3 right-3 text-4xl"><i className="icon-play"></i></a>
                            </div>
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onClick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
                        </div>
                    </li>
                    <li className="image-card" onClick={() => setPreview(true)}>
                        <div>
                            <img src={gallery2Image} alt="gallery-2" className="w-full" />
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
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onClick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
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
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onClick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
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
                            <a href="#" className="absolute inset-0 w-full h-full opacity-100 pointer-events-auto" onClick="addActive('#video-card','active')">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oYRda7UtuhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </a>
                        </div>
                    </li>
                    <li className="image-card">
                        <div>
                            <img src={gallery3Image} alt="gallery-3" className="w-full" />
                        </div>
                    </li>
                </ul>
=======
                {gallery.map(e => {
                    return (
                        <ul className="space-y-8">
                            {
                                (e.type === "photo") ?
                                    <li className="image-card" onClick={() => setPreview(true)}>
                                        <div>

                                            <img key={e.id} src={s3Url + "/" + e?.url} alt="gallery-2" />
                                        </div>
                                    </li>
                                    :
                                    <li className="image-card" onClick={() => setPreview(true)}>
                                        <div>

                                            <video loop src={s3Url + "/" + e?.url} alt="no video" type="video/mp4"></video>
                                        </div>
                                    </li>
                            }                    </ul>

                    )
                }
                )
                }
                <img src={gallery2Image} alt="gallery-2" className="w-full" />


>>>>>>> 5e534f25b19be2ded951102b29acff5cd5bf6029
            </div>
            <Modal isOpen={preview} >
                <GalleryImageAndVideoPreview handleClose={setPreview} />
            </Modal>
        </div >
    )
}

export default GalleryAll;
