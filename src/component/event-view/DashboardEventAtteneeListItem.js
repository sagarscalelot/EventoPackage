import React from 'react'
import { s3Url } from '../../config';
import preview from '../../assest/images/userdefault.jpg';
import moment from 'moment';




function DashboardEventAtteneeListItem({ data }) {
    console.log("Attend",data);
    let reviewTime = moment.unix(data?.start_timestamp/1000).fromNow();
    return (
        <div className="bg-white px-5 py-2.5 flex justify-between items-center rounded-md">
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <h3 className="text-base">{data?.userid?.name}</h3>
                    <span className="input-titel font-bold text-ufoGreen" style={{ paddingBottom: 0 }}>{data?.invoice_no}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <p className="text-quicksilver text-xs font-bold flex items-center"><i className="icon-location mr-2 text-sm"></i>{data?.address}</p>
                    <p className="text-quicksilver text-xs font-bold flex items-center"><i className="icon-booking mr-2 text-sm"></i>{reviewTime}</p>
                </div>
            </div>
            <h3 className="text-lg">{data?.totalPrice}</h3>
        </div>
    )
} 

export default DashboardEventAtteneeListItem;
