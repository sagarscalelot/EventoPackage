import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { baseUrl } from '../../config';
import BookingListItem from './BookingListItem';

function Booking() {
    const [booking, setBooking] = useState([]);
    const token = localStorage.getItem("Token");

    const header = {
        'Authorization': `Token ${token}`
    }
    const BookingList = async () => {
        const response = await axios.get(`${baseUrl}/organizer/booking/list`, { headers: header });
        setBooking(response.data.Data);
        console.log("AAAAAAAAAA", response.data.Data);
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
                    <BookingListItem key={e._id} data={e} />
                ))}
            </div>           
        </div>
    )
}

export default Booking;
