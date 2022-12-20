import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from "../modal/Modal";
import EventPopUpAddItems from './popups/EventPopUpAddItems';
import EventAddItemListItem from './EventAddItemListItem';
import StepProgressBar from './StepProgressBar';
import axios from 'axios';
import { baseUrl } from '../../config';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/stepProgressCount';
import { toast, ToastContainer } from 'react-toastify';
import { MoonLoader } from 'react-spinners';

function EventAddItems() {
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const params = useParams();
	const eventType = params.eventType;
	const eventId = localStorage.getItem("eventId");
	const event_type = localStorage.getItem("event_type");
	const dispatch = useDispatch();
	const [isAddItemPopUpOpen, setIsAddItemPopUpOpen] = useState(false);
	const [itemList, setItemList] = useState([]);
	const [activeList, setActiveList] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(true);
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}
	const getItemList = async () => {
		try {
			const response = await axios.get(`${baseUrl}/organizer/events/listitem?eventType=${event_type}`, { headers: header });
			console.log("items >>", response.data.Data);
			if (response.data.Data) {
				setItemList(response.data.Data);
				setLoading(false);
				const responseActive = await axios.get(`${baseUrl}/organizer/events/getselectitem?eventid=${eventId}`, { headers: header });
				console.log("Active items>> ", responseActive.data.Data.items);
				if (responseActive.data.Data.items) {
					const temp = responseActive.data.Data.items.map(e => {
						return e._id
					})
					setActiveList(temp);
				}
			}
			if (!response.data.IsSuccess) {
				toast.error("Enable To Fetch Data.");
			}
		} catch (error) {
			toast.error("Something Went wrong.");
			console.log(error);
		}



	}

	useEffect(() => {
		getItemList();
	}, [isAddItemPopUpOpen, reload]);

	const clickNextHandler = () => {
		toast.success("Items saved Successfully.");
		dispatch(increment());
		if (eventType === "hyp") navigate(`../capacity`);
		else if (eventType === "gsb") navigate(`../addequipments`)
		else navigate(`../othercost`);
	};

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}

	return (
		//  <!-- Content In -->
		<div>
			<div className="wrapper min-h-full">
				<div className="space-y-8">
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
							<h1>{displayName}</h1>
						</div>
						<button onClick={() => setIsAddItemPopUpOpen(true)} className="btn-primary flex items-center"><i className="icon-plus mr-3"></i><span>Add Item</span></button>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					<MoonLoader
						cssOverride={{ margin: "100px auto" }}
						color={"#20c0E8"}
						loading={loading}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					<div className="pt-5 space-y-3">

						{itemList?.map(element => <EventAddItemListItem data={element} key={element._id} eventId={eventId} edit={true} setReload={setReload} activeList={activeList} setActiveList={setActiveList} />)}

					</div>
				</div>
				{/* <!-- next preview button  --> */}
				<div className="prw-next-btn mt-auto">
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
					<button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</div>
			<Modal isOpen={isAddItemPopUpOpen}>
				<EventPopUpAddItems  handleClose={setIsAddItemPopUpOpen} setReload={setReload} edit={false} />
			</Modal>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	)
}

export default EventAddItems;