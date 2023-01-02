import axios from 'axios';

import { data } from 'jquery';
import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react';
import bookingImg from '../../assest/images/banner-preview.png'
import userImg from '../../assest/images/landing-page/user-i.png'
import { baseUrl, s3Url } from '../../config';

function Booking() {
    const [booking, setBooking] = useState([]);

    const token = localStorage.getItem("Token");
    const header = {
        'Authorization': `Token ${token}`,
    }
    const BookingList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/organizer/booking/list`, { headers: header });
            console.log("Booking Data", response.data.Data);
            setBooking(response.data.Data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        BookingList();
    }, [])

    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <h1 className="w-4/12">Booking</h1>
                    <div className="w-8/12 flex items-center space-x-2.5">
                        <span className="w-1/12 text-xl font-bold">Filter</span>
                        <div className="w-4/12 bg-white flex justify-between items-center py-2 px-3 rounded-md">
                            <input type="date" className="w-full outline-none" placeholder="" />
                            <span className="icon-calendar pl-2"></span>
                        </div>
                        <div className="w-3/12 bg-white flex justify-between items-center py-2 px-3 rounded-md">
                            <input type="time" className="w-full outline-none" placeholder="" />
                            <span className="icon-time pl-2"></span>
                        </div>
                        <div className="w-4/12 relative bg-white py-2 px-3 rounded-md">
                            <select name="All Category" className="arrow pr-11 text-japaneseIndigo font-bold tracking-wider appearance-none focus-visible:outline-none">
                                <option value="all-category">Select Place</option>
                                <option value="Party ">Select Place 1 </option>
                                <option value="Traveling Trip">Select Place 2</option>
                                <option value="DJ Party">Select Place 3</option><option value="Song">Song</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- main-content  --> */}
            <div className="space-y-5 mt-6">
                {booking.map((e) => (
                    <div key={e._id} className="w-full bg-white flex p-2.5 rounded-md">
                        <div className="w-1/6">
                            <img src={e && e.url && e.url !== '' ? (s3Url + "/" + e.url) : bookingImg} alt="sweet-love-catering-2" className="w-auto h-full object-cover" />
                            {/* (s3Url + "/" + data.aboutplace.banner) */}
                        </div>
                        <div className="w-full px-3">
                            <div className="flex justify-between items-center pb-2">
                                <h2>{e?.category_name}</h2>
                                <h2>{e?.totalPrice} INR</h2>
                            </div>
                            <div className="flex items-center space-x-2 pb-5 border-b">
                                <img src={e && e.userid && e.userid.profile_pic && e.userid.profile_pic !== '' ? (s3Url + "/" + e.userid.profile_pic) : userImg} alt="user-3" className="w-9 h-9 object-cover" />
                                <p className="text-base text-quicksilver font-normal">{e?.userid?.name}</p>
                            </div>
                            <div className="flex items-center justify-between py-5">
                                <div className="flex  space-x-7">
                                    <div>
                                        <span className="text-xs text-quicksilver font-bold"><i className="icon-calendar2 pr-2"></i>Date</span>
                                        <p className="text-base">{e?.start_date}</p>
                                    </div>
                                    <div className="border-x px-7">
                                        <span className="text-xs text-quicksilver font-bold"><i className="icon-light-fill-time pr-2"></i>Time</span>
                                        <p className="text-base">{e?.start_time}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-quicksilver font-bold"><i className="icon-location pr-2"></i>Location</span>
                                        <p className="text-base">{e?.address}</p>
                                    </div>
                                </div>
                                <button className='bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md'>download invoice</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Booking;
