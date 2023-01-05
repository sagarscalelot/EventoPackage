import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import Advertisement from '../Advertisement';
import axios from 'axios';
import { baseUrl } from '../../config';
import StepProgressBar from './StepProgressBar';
import { decrement, reset } from '../../redux/stepProgressCount';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import moment from 'moment/moment';

function EventCalender() {
	const displayName = localStorage.getItem("displayName");
	const token = localStorage.getItem("Token");
	const eventId = localStorage.getItem("eventId");
	const [calenderlist, setcalenderlist] = useState([])
	const [pageNo, setPageNo] = useState(1);
	const limit = 10;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const eventType = params.eventType;
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [name, setName] = useState("")
	const header = {
		'Authorization': `Token ${token}`
	}
	

	const setDate = (e) => {
		const date = e.target.value.split("-");
		console.log(new Date(date[0], date[1], date[2]));
	}

	const Calendar = async () => {
		try {
			const response = await axios.get(`${baseUrl}/organizer/events/getone?eventid=${eventId}`, { headers: header });
			setName(response.data.Data.attendee[0].name)

			const zebra = moment.unix(response.data.Data.attendee[0].start_timestamp/1000).format('LL HH:mm');
			console.log("TYTYTYTYTYTYTYTYTYTYTYTYTYTYTYY : ",typeof (zebra));
			console.log("TYTYTYTYTYTYTYTYTYTYTYTYTYTYTYY : ",(moment.unix(response.data.Data.attendee[0].end_timestamp/1000).format('LL HH:mm')));


			setStartDate((moment.unix(response.data.Data.attendee[0].start_timestamp/1000)).toString());
			setEndDate((moment.unix(response.data.Data.attendee[0].end_timestamp/1000)).toString());
			
		} catch (error) {
			console.log(error);
		}
	}
  
	// const leopard = ()=>{
	// 		{ title: {name},  start: new Date({startDate}), end: new Date({endDate}), color: generateRandomColor() },
	// }
	useEffect(() => {
		Calendar();
	}, [])


	const clickNextHandler = () => {
    	dispatch(reset());
		navigate("/dashboard");
	}

  const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	const generateRandomColor = () =>{
		let maxVal = 0xFFFFFF; // 16777215
		let randomNumber = Math.random() * maxVal; 
		randomNumber = Math.floor(randomNumber);
		randomNumber = randomNumber.toString(16);
		let randColor = randomNumber.padStart(6, 0);   
		return `#${randColor.toUpperCase()}`
	}
	
	
  return (
	    // <!-- Content In -->
		<div>
		<div className="wrapper">
		  
		  <div className="space-y-8">
			{/* <!-- title-holder  --> */}
			<div className="flex justify-between items-center">
			  <div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i><h1>{displayName}</h1></div>
			</div>
			{/* <!-- step-progress-bar  --> */}
			<StepProgressBar eventType={eventType} />
			{/* <!-- main-content  --> */}
			<div className="space-y-5">
			  <div className="flex items-end -mx-3.5">
				<div className="w-full lg:w-1/3 px-3.5">
				  <h3 className="pb-2">Start Date &Time</h3>
				  <label className="bg-white rounded-md flex space-x-3 relative">
					<i className="icon-date-time flex items-center pl-5 absolute left-0 inset-y-0"></i>
					<input type="date" onChange={setDate} className="w-full rounded-md outline-none appearance-none pl-10 py-4"/>
				  </label>
				</div>
				<div className="w-full lg:w-1/3 px-3.5">
				  <h3 className="pb-2">End Date &Time</h3>
				  <label className="bg-white rounded-md flex space-x-3 relative">
					<i className="icon-date-time flex items-center pl-5 absolute left-0 inset-y-0"></i>
					<input type="date" className="w-full rounded-md outline-none appearance-none pl-10 py-4"/>
				  </label>
				</div>
				<div className="w-full lg:w-1/3 px-3.5">
				  <h3 className="pb-2">Months</h3>
				  <select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow">
					<option></option>
					<option></option>
					<option></option>
				  </select>
				</div>
				<div className="w-full lg:w-1/3 px-3.5">
				  <h3 className="pb-2">Years</h3>
				  <select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-4 relative arrow">
					<option></option>
					<option></option>
					<option></option>
				  </select>
				</div>
			  </div>
				<div>{startDate}</div>
				<div className="calendar inline-block justify-center items-center rounded-md drop-shadow-one bg-white w-full px-12 py-7">
					<FullCalendar
						plugins={[dayGridPlugin]}
						initialView="dayGridMonth"
						events={[
							{ title: name,  start: new Date(startDate), end: new Date(endDate), color: generateRandomColor() },
						  ]}
						
					/>
				</div>
			  {/* <!-- calendar end --> */}
			  {/* <Advertisement /> */}
			  <div className="prw-next-btn">
				<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
				<button className="btn-primary" onClick={clickNextHandler}>Done</button>
			  </div>
			</div>
		</div>
	  </div>
	  </div>
  )
}

export default EventCalender