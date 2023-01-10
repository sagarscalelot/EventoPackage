import React from 'react'
import bannerpreview from "../../assest/images/banner-preview.png";
import userImg from "../../assest/images/landing-page/user-i.png";
import user3Image from "../../assest/images/user-3.png";
import { s3Url } from '../../config';

function BookingListItem(data) {
    console.log("Data Booking", data);
    return (
        <div className="w-full bg-white flex p-2.5 rounded-md">
            <div className="w-1/6">
                <img src={data?.data && data.data?.url !== '' ? (s3Url + "/" + data?.data?.url) : bannerpreview} alt="sweet-love-catering-2" className="w-auto h-full object-cover" /></div>
            <div className="w-full px-3">
                <div className="flex justify-between items-center pb-2">
                    <h2>{data?.data?.name}</h2>
                    <h2>{data.data.totalPrice} INR</h2>
                </div>
                <div className="flex items-center space-x-2 pb-5 border-b w-9 h-9 over">
                    <img src={data?.data && data?.data?.userid && data?.data?.userid?.profile_pic && data?.data?.userid?.profile_pic !== '' ? (s3Url + "/" + data?.data?.userid?.profile_pic) : userImg} alt="user-3" className="w-full h-full object-cover" />
                    <p className="text-base text-quicksilver font-normal">{data?.data?.userid?.name}</p>
                </div>
                <div className="flex items-center pt-5 space-x-7">
                    <div>
                        <span className="text-xs text-quicksilver font-bold"><i className="icon-calendar2 pr-2"></i>Date</span>
                        <p className="text-base">{data?.data?.start_date}</p>
                    </div>
                    <div className="border-x px-7">
                        <span className="text-xs text-quicksilver font-bold"><i className="icon-light-fill-time pr-2"></i>Time</span>
                        <p className="text-base">{data?.data?.start_time}</p>
                    </div>
                    <div>
                        <span className="text-xs text-quicksilver font-bold"><i className="icon-location pr-2"></i>Location</span>
                        <p className="text-base">{data?.data?.address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingListItem;
