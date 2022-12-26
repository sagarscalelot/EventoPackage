
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
            // console.log("Full Gallery : ", response.data.Data.filter(photo => (photo.type === "photo")));
            setGallery(response.data.Data.filter(photo => (photo.type === "photo")));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGallery();
    }, []);

    return (
        <div className="w-full relative" id="photo">
            <div className="container">
                {console.log(gallery)}
                {gallery.map(e => (
                    <figure onClick={() => setPreview(true)}>
                        <img key={e.id} src={s3Url + "/" + e?.url} alt="Gallary img" />
                    </figure>
                ))}
            </div>
            <Modal isOpen={preview} >
                <GalleryImageAndVideoPreview handleClose={setPreview} data={gallery} />
            </Modal>
        </div>
    )
}

export default GalleryPhotos;