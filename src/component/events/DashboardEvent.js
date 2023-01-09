import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import EventPopUpCreateNew from './popups/EventPopUpCreateNew';
import axios from 'axios';
import { baseUrl } from '../../config';
import DashboardEventCategoryItem from './DashboardEventCategoryItem';
import { useParams } from 'react-router-dom';
// import Advertisement from "../Advertisement";
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/stepProgressCount';
import { MoonLoader } from 'react-spinners';
import Paggination from '../Paggination';
import { getEventType } from '../../shared/helper';

function DashboardEvent() {
	const params = useParams();
	const dispatch = useDispatch();
	const [isCreateNewPopUpOpen, setIsCreateNewPopUpOpen] = useState(false);
	const [allEvents, setAllEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const token = localStorage.getItem("Token");
	const eventType = getEventType(params.eventType);
	const limit = 3;
	const [activeList, setActiveList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");

	const header = { 
		'Authorization': `Token ${token}`
	}
	const getAllEvents = async () => {
		const requestObj = {
			page: pageNo,
			limit: limit,
			event_type: eventType,
			category_name: selectedCategory
		}
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/list`, requestObj, { headers: header });
			setAllEvents(response.data.Data);

			// console.log("Event List>>>>>",response.data.Data);

			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	const handleClick = (list) => {
		console.log("back list : ", list);
	};

	const getCategory = async () => {
		try {
			const response = await axios.get(`${baseUrl}/organizer/events/listcategory?event_type=${eventType}`, { headers: header });
			setCategory(response.data.Data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAllEvents();
	}, [pageNo, selectedCategory]);

	useEffect(() => {
		getCategory();
		dispatch(reset());
	}, [isCreateNewPopUpOpen]);

	const multipleEventlive = async () => {
		console.log("live id : ",)
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/livemulti`, { eventids: activeList }, { headers: header });
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	const checkboxHandler = (e, ele) => {

		if (e.target.checked) {
			// ele.is_live = true;
			console.log("in if");
			setActiveList(current => [...current, ele._id]);
		} else {
			console.log("in else");
			// ele.is_live = false;

			setActiveList(current => current.filter(data => data !== ele._id))
		}
		// handleClick=(activeList)
	}

	const cat = (e) => {
		console.log("e : ", e);
		setSelectedCategory(e);
	}
// console.log("live list : ", activeList);
	return (
		<div className="wrapper">
			<div className="flex flex-wrap items-center">
				<h1>All Category</h1>
				<div className="flex whitespace-nowrap space-x-5 ml-auto">
					<select name="All Category"
						className="arrow bg-white pl-5 pr-11 py-3 text-japaneseIndigo font-bold rounded-md tracking-wider appearance-none focus-visible:outline-none"
						onChange={(e) => cat(e.target.value)}>
						<option value="" >All Category</option>
						{category?.map(ele => (
							<option value={ele?.category_name} key={ele._id} >{ele?.category_name}</option>
						))}
					</select>
					<button className="bg-white px-5 py-3 text-japaneseIndigo font-bold rounded-md tracking-wider"
					
						onClick={() => multipleEventlive()}>MultipleLive</button>
					<button href="#" onClick={() => setIsCreateNewPopUpOpen(true)} className="btn-primary"><i className="icon-plus mr-3"></i>Create New</button>
				</div>
			</div>
			<div className="space-y-5 pt-10 h-auto" >
				<MoonLoader
					cssOverride={{ margin: "100px auto" }}
					color={"#20c0E8"}
					loading={loading}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
				{allEvents.docs?.map(ele => (
					<>
					<div className="w-full flex items-center ">
					{ ele.is_approved == true ?
						<div>
							<label className="checkbox w-16">
								<input type="checkbox" className="bg-white"
									// checked={ele.isAdded}
									// checked={ele.is_live}
									onChange={(e) => checkboxHandler(e, ele)} />
								<i className="icon-right"></i>
							</label>
						</div> : <div>
							<label className="checkbox w-16">
								<input type="checkbox" className="bg-white opacity-30"
									disabled
									 />
							
							</label>
						</div>
					}
						
						<DashboardEventCategoryItem key={ele._id} data={ele} liveList={handleClick} />
						</div>
					</>
				))}
				{!loading && ((allEvents?.totalPages > 0) ? <Paggination allEvents={allEvents} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>No Event Found</h1>)}

				<Modal isOpen={isCreateNewPopUpOpen} >
					<EventPopUpCreateNew handleClose={setIsCreateNewPopUpOpen} eventType={eventType} edit={false} />
				</Modal>
			</div>
			{/* <!-- advisement --> */}
			{/* {!loading && <Advertisement />} */}
		</div>
	)
}


export default DashboardEvent;