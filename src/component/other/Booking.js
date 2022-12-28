import React from 'react'
import sweetLoveCatering2Image from "../../assest/images/sweet-love-catring-2.png";
import user3Image from "../../assest/images/user-3.png";

function Booking() {
    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <h1 class="w-4/12">Booking</h1>
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
                            <select name="All Category" class="arrow pr-11 text-japaneseIndigo font-bold tracking-wider appearance-none focus-visible:outline-none">
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
                <div className="w-full bg-white flex p-2.5 rounded-md">
                    <div className="w-1/6">
                        <img src={sweetLoveCatering2Image} alt="sweet-love-catering-2" className="w-auto h-full object-cover" />
                    </div>
                    <div className="w-full px-3">
                        <div className="flex justify-between items-center pb-2">
                            <h2>Sweet Love Catering</h2>
                            <h2>250 INR</h2>
                        </div>
                        <div className="flex items-center space-x-2 pb-5 border-b">
                            <img src={user3Image} alt="user-3" className="w-9 h-9 object-cover" />
                            <p className="text-base text-quicksilver font-normal">Mobina Mirbagheri</p>
                        </div>
                        <div className="flex items-center justify-between py-5">
                            <div className="flex  space-x-7">
                                <div>
                                    <span className="text-xs text-quicksilver font-bold"><i className="icon-calendar2 pr-2"></i>Date</span>
                                    <p className="text-base">July 23, 2021</p>
                                </div>
                                <div className="border-x px-7">
                                    <span className="text-xs text-quicksilver font-bold"><i className="icon-light-fill-time pr-2"></i>Time</span>
                                    <p className="text-base">04:00PM</p>
                                </div>
                                <div>
                                    <span className="text-xs text-quicksilver font-bold"><i className="icon-location pr-2"></i>Location</span>
                                    <p className="text-base">Vesu, Surat</p>
                                </div>
                            </div>
                            <button className='bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md'>download invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking;
