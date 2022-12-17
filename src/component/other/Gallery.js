import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";
// import { toast } from "react-toastify";
import GalleryAll from "./GalleryAll";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";

function Gallery() {

    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Token ${token}`,
  };

  const getGallery = async () => {
    try {
      const response = await axios.get(`${baseUrl}/organizer/gallery`, {
        headers: header,
      });
      if(response.data.Data) setImageList(response.data?.Data);
      if(response.data.Data) setVideoList(response.data?.Data);
      console.log("Gallery",response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGallery();
  }, []);

  const [tab, setTab] = useState(1);
  return (
    <div className="flex min-h-full wrapper">
      <div className="flex flex-wrap space-y-7 w-full">
        {/* <!-- title-holder  --> */}
        <div className="space-y-6 w-full">
          <h1 className="w-full">Gallery</h1>
          {/* <!-- tab-holder  --> */}
          <div className="teb-holder gallery-holder border-t border-b-0">
            <button
              type="button"
              data-tab="all"
            //   className={tab === 1 ? "active" : undefined}
              onClick={() => setTab(1)}
            >
              All
            </button>
            <button
              type="button"
              data-tab="photo"
              className={tab === 2 ? "active" : undefined}
              onClick={() => setTab(2)}
            >
              Photo
            </button>
            <button
              type="button"
              data-tab="video"
              className={tab === 3 ? "active" : undefined}
              onClick={() => setTab(3)}
            >
              Video
            </button>
          </div>
          {/* <!-- gallery-holder / --> */}
          <div className="gallery-holder">


            {tab === 1 &&  <GalleryAll  imageList={imageList} videoList={videoList}
             />}
            {tab === 2 && <GalleryPhotos />}
            {tab === 3 && <GalleryVideos />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
