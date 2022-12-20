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


			</div>
			<Modal isOpen={preview} >
				<GalleryImageAndVideoPreview handleClose={setPreview} />
			</Modal>
		</div >
	)
}

export default GalleryAll;