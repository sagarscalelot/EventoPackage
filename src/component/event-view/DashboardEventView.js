import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dashboardBgImage from "../../assest/images/dashboard-bg.png";
import { baseUrl, s3Url } from '../../config';
import DashboardEventAttendee from './DashboardEventAttendee';
import DashboardEventReview from './DashboardEventReview';
import DashboardEventViewOverview from './DashboardEventViewOverview';
import bannerPreview from "../../assest/images/banner-preview.png";

function DashboardEventView() {
  const [tab, setTab] = useState(1);
  const [event, setEvent] = useState({});
  const [review, setReview] = useState({});
  const [capacity, setCapacity] = useState({});
  const [socials, setsocials] = useState({});
  const [company, setCompany] = useState({});
  const [service, setService] = useState([]);
  const eventId = localStorage.getItem("eventId");
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("Token");

  const header = {
    'Authorization': `Token ${token}`
  }
  const getEventById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/organizer/events/getone?eventid=${eventId}`, { headers: header });
      // console.log("Full Event", response.data.Data);
      setEvent(response.data.Data);
      setCapacity(response.data.Data.capacity);
      setsocials(response.data.Data.tandc);
      setCompany(response.data.Data.companydetail);
      setService(response.data.Data.services);
      setReview(response.data.Data.reviews);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getEventById();
  }, []);
  return (
    <>
      <div className="-mt-12 relative -z-10">
        <div className="-mt-12 relative -z-10 h-[300px] xl:h-[400px]">

          <img src={(event && event?.aboutplace && event?.aboutplace?.banner && event?.aboutplace?.banner != '') ? (s3Url + "/" + event?.aboutplace?.banner) : (
            event && event?.personaldetail && event?.personaldetail?.banner && event?.personaldetail?.banner != '' ? (s3Url + "/" + event?.personaldetail?.banner) : bannerPreview
          )} alt="dashboard-bg" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="wrapper min-h-full -mt-14 z-10">

        <div className="flex items-center justify-between bg-white py-5 px-7 rounded-md">
          <h2>{event?.display_name}</h2>
          <div className="space-y-4">
            <div className="flex space-x-6 items-center justify-end">
              <button type="button" className="py-1 px-2 bg-spiroDiscoBall text-sm font-bold text-white">promotion</button>
              <button type="button" className="w-8 h-8 bg-brightGray rounded-full flex items-center justify-center"><i className="icon-share text-sm"></i></button>
            </div>
            <div className="flex items-center text-base font-semibold text-ufoGreen space-x-1">
              <a href="#">{(capacity?.facilities) ? (capacity?.facilities?.replace("_", " ").replace("_", " / ").toUpperCase()) : ""}</a>
              {/* <a href="#">Romantic Dinner</a>
                    <span>/</span>
                    <a href="#">Lunch</a> */}
            </div>
          </div>
        </div>
        {/* <!-- tab-holder  --> */}
        <div className="teb-holder">
          <button type="button" data-tab="overview" className={tab === 1 ? "active" : undefined} onClick={() => setTab(1)}>Overview</button>
          <button type="button" data-tab="attendee" className={tab === 2 ? "active" : undefined} onClick={() => setTab(2)}>Attendee</button>
          <button type="button" data-tab="reviews" className={tab === 3 ? "active" : undefined} onClick={() => setTab(3)}>Reviews</button>
        </div>
        {/* <!-- tab-contents-holder --> */}
        {tab === 1 && <DashboardEventViewOverview data={event} capacity={capacity} socials={socials} company={company} service={service} />}
        {tab === 2 && <DashboardEventAttendee />}
        {tab === 3 && <DashboardEventReview  />}
      </div>
    </>
  )
}

export default DashboardEventView;