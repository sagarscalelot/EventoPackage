import React from "react";

function DashboardEventViewOverviewPhoto({ imageUrl, alt }) {
  return (
    <div className="ov-p">
      <div className="rounded relative overflow-hidden">
        <img src={imageUrl} alt={alt} className="w-full py-2" />
      </div>
    </div>
  );
}

export default DashboardEventViewOverviewPhoto;
