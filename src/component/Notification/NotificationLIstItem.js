import React from "react";
import { s3Url } from "../../config"
import { Link } from "react-router-dom";
import notificationSvg2 from "../../assest/svg/notification-2.svg";
import parse from 'html-react-parser';
import {  increments } from '../../redux/stepProgressNotification';
import { useDispatch } from 'react-redux';

function NotificationLIstItem({ data }) {
  const dispatch = useDispatch();


  return (

    <div className="bg-white p-5 rounded-md">
      <div className="flex justify-between items-center">
        <div className="w-2/12">
          <img src={(data && data.banner && data.banner != '') ? (s3Url + "/" + data.banner) : notificationSvg2} alt="" className="max-h-[130px] h-full w-full object-cover" />
        </div>
        <div className="w-10/12">
          <div className="flex justify-between pl-4">
            <h2>{data?.notification_title}</h2>
            <Link to="/">
              <i className="icon-more font-bold text-base"></i>
            </Link>
          </div>
          <p className="text-gray-400 text-base pt-3 font-medium pl-4">
            {parse(data?.description)}
          </p>
          <div className="flex justify-end">
            <button className="btn-primary small flex items-center">
              <i className="icon-fill-megaphone mr-2"></i>
              <Link to="selectbusiness" onClick={ () => { localStorage.setItem("notificationid", data?._id);  dispatch(increments()) }} >Promote</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationLIstItem;