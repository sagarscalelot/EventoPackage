import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { s3Url } from '../../config';
import { useDispatch } from 'react-redux';
import { increment } from '../../redux/stepProgressCount';
import bannerPreview from "../../assest/images/banner-preview.png";
import axios from 'axios';
import { baseUrl } from '../../config';




 
 const Star = ({ratings}) => {
	const numberRating = Number(ratings);
	console.log("numberRating",numberRating);
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {numberRating >= index + 1 ? (
          <i className="icon-fillStar text-sm"></i>
        ) : numberRating >= number ? (
          <i className="icon-half-star text-sm"></i>
        ) : (
          <i className="icon-star text-sm"></i>
        )}
      </span>
    );
  });
	 return (
		<div>{ratingStar}</div>
	 )
 };
 

 



function  DashboardEventCategoryItem({ data, handleClick }) {


	const dispatch = useDispatch();

	const params = useParams();
	const eventType = params.eventType;

	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`,
	}


	const singleEventlive = async (id) => {
		console.log("live id : ", id)
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/liveone`, { eventid: id }, { headers: header });
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	const toggleEvent = async (id) => {
		console.log("e : ", id);

		try {
			const response = await axios.post(`${baseUrl}/organizer/events/liveone`, { eventid: data._id }, { headers: header });
			console.log("event active : ", response);
		} catch (error) {
			console.log("Something went Wrong.");
			console.log(error);
		}
	}


	return (
		<div className="w-full flex items-center ">			
				<div className="flex space-x-5 w-full p-4 pr-7 bg-white rounded">
					<div className="max-w-xs h-[200px] w-full">
					<Link to={`../../event-view/${eventType}`} className="" onClick={() => { localStorage.setItem("eventId", data?._id) }} >
						<img className="object-cover w-full h-full" src={(data && data.aboutplace && data.aboutplace.banner && data.aboutplace.banner != '') ? (s3Url + "/" + data.aboutplace.banner) : (data && data.personaldetail && data.personaldetail.banner && data.personaldetail.banner !== '') ? (s3Url + "/" + data.personaldetail.banner) : bannerPreview} alt="images" /></Link>
					</div>
					<div className="w-full">
						<div className="flex justify-between border-b-2 pb-4">
							<div className="">
								<span className="text-sm text-white bg-spiroDiscoBall px-3 py-1">{data?.event_category.category_name}</span>
								<h2 className="text-japaneseIndigo pt-5">{data?.display_name}</h2>
								<div className="text-sm text-quicksilver pt-3"><i className="icon-fill-location mr-3"></i>{(data?.capacity?.address && data?.capacity?.address !== "") || (data?.personaldetail?.area && data?.personaldetail?.area !=="" && data?.personaldetail?.city && data?.personaldetail?.city !=="" && data?.personaldetail?.state && data?.personaldetail?.state !=="" ?  data?.personaldetail?.area + ","+ data?.personaldetail?.city+"," +  data?.personaldetail?.state : "")}
</div>
							</div>
							<div className="">
								<div className="flex items-center">

								{/* {console.log("check : ", data?.display_name, data?.is_live)} */}

								<input type="checkbox" className="switch mr-3"
									// defaultChecked={data?.is_live}
									id="on"
									defaultChecked={data?.is_live}
									// onClick={() => singleEventlive(data?._id)}
									onChange={() => toggleEvent(data)}

									/>
									<label htmlFor="">
										<h3>Live</h3>	
									</label>
								</div>
								<h1 className="pt-7">{data?.aboutplace?.place_price} INR</h1>

							</div>
							<h1 className="pt-7">{parseFloat(data?.totalPrice).toFixed(2)} INR</h1>
						</div>

						<div className="flex justify-between pt-4">
							<div className="flex items-center space-x-1">
							<Star ratings={data.ratings}/>
								<span className="text-quicksilver text-xs font-bold pl-2">{data?.totalreview} ratings</span>
							</div>
							<div className="flex space-x-2">
								<Link to={`../addplaces`} onClick={() => { localStorage.setItem("eventId", data?._id); localStorage.setItem("event_type", data?.event_type); dispatch(increment()) }} className="bg-brightGray px-2 py-1 text-center rounded"><i className="text-base edit text-black icon-edit" style={{ color: "#000" }}></i></Link>
								<Link to="/" className="bg-brightGray px-2 py-1 text-center rounded"><i
									className="icon-fill-megaphone text-base text-black"></i></Link>
								<Link to={`/dashboard/event/calender`} className="bg-brightGray px-2 py-1 text-center rounded"><i
									className="icon-calendar1 text-base text-black"></i></Link>
								<Link to="/" className="bg-brightGray px-2 py-1 text-center rounded"><i
									className="icon-percentage text-base text-black"></i></Link>
								<Link to="/" className="bg-brightGray px-2 py-1 text-center rounded"><i
									className="icon-share text-base text-black"></i></Link>
							</div>

						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default DashboardEventCategoryItem;