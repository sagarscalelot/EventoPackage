import React from "react";
import videoPreview from "../../assest/images/video-preview.png";

function DashboardEventViewOverviewVideo({ videoUrl }) {
  return (
    <div className="ov-p ">
      <div className="rounded relative overflow-hidden border-2">
        {videoUrl ? <video><source src={videoUrl} alt="upload-1" type="video/mp4" /></video> : <img src={videoPreview} alt="upload-1" className="w-full bg-white" />}

      </div>
    </div>
  );
}

export default DashboardEventViewOverviewVideo;