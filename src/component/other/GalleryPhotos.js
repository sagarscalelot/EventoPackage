
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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