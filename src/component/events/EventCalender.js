import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import Advertisement from '../Advertisement';
import StepProgressBar from './StepProgressBar';
import { decrement, reset } from '../../redux/stepProgressCount';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config';

function EventCalender() {
	const displayName = localStorage.getItem("displayName");
	const token = localStorage.getItem("Token");
	const eventId = localStorage.getItem("eventId");

	const [calenderlist, setcalenderlist] = useState([])
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const eventType = params.eventType;

	// const calendarRef = useRef(null)


	const header = {
		'Authorization': `Token ${token}`
	}
	const setDate = (e) => {
		const date = e.target.value.split("-");
		console.log(new Date(date[0], date[1], date[2]));
	}

	const clickNextHandler = () => {
		dispatch(reset());
		navigate("/dashboard");
	}

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	const generateRandomColor = () => {
		let maxVal = 0xFFFFFF; // 16777215
		let randomNumber = Math.random() * maxVal;
		randomNumber = Math.floor(randomNumber);
		randomNumber = randomNumber.toString(16);
		let randColor = randomNumber.padStart(6, 0);
		return `#${randColor.toUpperCase()}`
	}

	const Calendar = async () => {
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/calendar`, { eventId: eventId }, { headers: header });
			// console.log("Calender Response", response.data.Data);
			// console.log("Calender Response", Object.entries(response.data.Data)); 
			setcalenderlist(response.data.Data);
		} catch (error) {
			console.log(error);
		}
	}

	console.log(">>>>>>>>>>>>>>>>>", calenderlist);



	// console.log(calenderlist);
	// const objectArray = Object.entries(calenderlist);
	// console.log("DDDDDDDDD",objectArray);
	// objectArray.forEach(([value]) => {
	// 	console.log("VVVVVVVVVVVVV",value);
	// });
	// const [title, setTitle] = useState('');
	// const events = [{ title: "title", data: new Date() }];
	useEffect(() => {
		Calendar();
	}, [])



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
									<input type="date" onChange={setDate} className="w-full rounded-md outline-none appearance-none pl-10 py-4" />
								</label>
							</div>
							<div className="w-full lg:w-1/3 px-3.5">
								<h3 className="pb-2">End Date &Time</h3>
								<label className="bg-white rounded-md flex space-x-3 relative">
									<i className="icon-date-time flex items-center pl-5 absolute left-0 inset-y-0"></i>
									<input type="date" className="w-full rounded-md outline-none appearance-none pl-10 py-4" />
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
						<div className="calendar inline-block justify-center items-center rounded-md drop-shadow-one bg-white w-full px-12 py-7">
							<FullCalendar
								// ref={calendarRef}
								plugins={[dayGridPlugin]}
								initialView="dayGridMonth"
								events={[
									{ title: 'title', start: new Date("january 1, 2023 15:20:00"), end: new Date("january 5, 2023 16:20:00"), color: generateRandomColor() }
								]}
							// events={[calenderlist]}
							// events={}

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