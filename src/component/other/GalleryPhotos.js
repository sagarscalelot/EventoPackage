import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gallery2Image from "../../assest/images/gallery-2.png";
import gallery3Image from "../../assest/images/gallery-3.png";
import gallery4Image from "../../assest/images/gallery-4.png";
import gallery6Image from "../../assest/images/gallery-6.png";
import GalleryImageAndVideoPreview from './modal/GalleryImageAndVideoPreview';

import Modal from '../modal/Modal';

import { baseUrl, s3Url } from '../../config';

function GalleryPhotos() {
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
        <div className="w-full relative" id="photo">
            <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {gallery.filter(photo => (photo.type === "photo")).map(e => {
                    return (
                        <ul className="space-y-8">

                            {(e.type === "photo") ?
                                <li className="image-card" onClick={() => setPreview(true)}>
                                    <div>

                                        <img key={e.id} src={s3Url + "/" + e?.url} alt="gallery-2" />
                                    </div>
                                </li>
                                :
                                <></>}
                        </ul>

                    )
                }
                )}
                <img src={gallery2Image} alt="gallery-2" className="w-full" />

            </div>
            <Modal isOpen={preview} >
                <GalleryImageAndVideoPreview handleClose={setPreview} />
            </Modal>
        </div>
    )
}

export default GalleryPhotos;
