import React, { useEffect, useState } from 'react';
import celebration from "../../assest/svg/celebration.svg";
import Modal from "../modal/Modal";
import axios from 'axios';
import { baseUrl } from '../../config';
import StepProgressBar from './StepProgressBar';
import { useNavigate, useParams } from 'react-router-dom';
import { decrement, increment } from '../../redux/stepProgressCount';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import EventPopUpDiscountOnEquipmentOrItem from './popups/EventPopUpDiscountOnEquipmentOrItem';
import EventPopUpDiscountOnTotalBill from './popups/EventPopUpDiscountOnTotalBill';

function EventDiscounts() {
	const displayName = localStorage.getItem("displayName");
	const [isDiscountPopUpOpen, setIsDiscountPopUpOpen] = useState(false);
	const [allDiscount, setAllDiscount] = useState([]);
	const params = useParams();
	const eventId = localStorage.getItem("eventId");
	const eventType = params.eventType;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [discount, setDiscount] = useState("");
	const [serviceOn, setServiceOn] = useState(false);
	// const [checkBoxCheck, setCheckBoxCheck] = useState(false); 
	const [activeList, setActiveList] = useState([]);
	const [selectedDiscount, setSelectedDiscount] = useState({});
	// console.log(activeList)
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}
	const getDiscount = async () => {
		const displayDiscount = [];
		try {

			const response = await axios.get(`${baseUrl}/organizer/discount/list`, { headers: header });
			// console.log("admin dis : ", response.data.Data);
			if (response.data.IsSuccess) {
				const res = await axios.get(`${baseUrl}/organizer/events/discount?eventid=${eventId}`, { headers: header });
				// console.log("length : ", res.data.Data.discounts.length);
				// {
				// 	res.data.Data.discounts.length === 0 ? setAllDiscount(response.data.Data) :   
				// }
				// for (let i = 0; i < response.data.Data.length; i++) {
				// for (let j = 0; j < res.data.Data.discounts.length; j++) {

				// 	if (res.data.Data.discounts.sid === response.data.Data._id) {
				// 		console.log("if");
				// 	  displayDiscount.push(res.data.Data.discounts[j]);
				// 	  break;
				// 	} else {
				// 		console.log("else");

				// 		displayDiscount.push(response.data.Data[i]);
				// 	}
				//   }
				// }
				// console.log("before ");
				response.data.Data.map((element) => {
					let isMatched = false;
					res.data.Data.discounts.map(selement => {
						if (selement.sid === element._id) {
							displayDiscount.push(selement);
							isMatched = true;
							console.log("matched");
							// setActiveList([]);
							setActiveList(current => [...current, selement]);
						}
						
					});
					if (!isMatched) {
						displayDiscount.push(element);
					}
				});
				// response.data.Data.map(element => {
				// 	res.data.Data.discounts.map(selement => {
				// 		if (selement.sid === element._id) {
				// 			displayDiscount.push(selement);
				// 			// break;
				// 			console.log("matched");
				// 		} else {
				// 			console.log("unmatched");
				// 			displayDiscount.push(element);
				// 		}
				// 	});
				// });
				// response.data.Data.map((dis,i) => {
				// 	res.data.Data.discounts.map((subdis,i) => {
				// 		if (subdis.sid === dis.id) {
				// 			console.log("match : ", subdis.id);
				// 			displayDiscount.push(subdis);

				// 		}
				// 		displayDiscount.push(dis);
				// 	})
				// })
				// console.log("Discounts : ", displayDiscount);
				setAllDiscount(displayDiscount);
				// setAllDiscount([...res.data.Data.discounts,...response.data.Data]);
			}

		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getDiscount();
	}, []);


	const createActiveDiscount = async () => {
		console.log("ActiveList", activeList)
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/discount`, { eventid: eventId, discounts: activeList }, { headers: header });

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	const initialRender = useRef(true);
	const initialRender2 = useRef(true);
	// useEffect(() => {
	// 	if (initialRender.current) {
	// 		initialRender.current = false;
	// 	  } else {
	// 		createActiveDiscount();
	// 	}
	// },[activeList]);

	// useEffect(() => {
	// 	if (initialRender2.current) {
	// 		initialRender2.current = false;
	// 	  } else {
	// 		setActiveList(current => current.map(ele => {
	// 			if(ele._id === selectedDiscount._id) {
	// 				return selectedDiscount;
	// 			} else {
	// 				return ele;
	// 			}
	// 		}))
	// 	}
	// },[selectedDiscount]);

	// const handleClick = (discount) => {
	// 	setDiscount(discount);
	// 	// selectedDiscount.sid = selectedDiscount._id
	// 	// console.log("dis from state : ", discount);
	//   };

	const clickNextHandler = async () => {
			// handleSubmit();
			try {
				// const createresponse = await axios.put(`${baseUrl}/api/org/discount/${discountId}?event_id=${eventId}`,{equipment_id: selecetdServiceId, discount: value+"%"},{headers: header});
				// console.log(response);
				// handleClose(false);
				console.log("try");
				
				const reqObj = {
					eventid: eventId,
					discounts: activeList
				}
				console.log("active list : ", activeList);
		
				console.log("obj : ", reqObj);
		
				const createResponse = await axios.post(`${baseUrl}/organizer/events/discount`, reqObj, { headers: header });
	
				console.log("res :", createResponse);
	
				// handleClose(false);
			} catch (error) {
				console.log("Error", error);
			}
			toast.success("Data saved Successfully.");
		dispatch(increment());
		navigate(`../calender`);
	}

	const clickBackHandler = () => {
		dispatch(decrement());
		navigate(-1);
	}

	const gradientStyle = (type) => {
		if (type === "discount_on_total_bill") return " from-[#13e1b094] to-[#13E1B0] ";
		if (type === "discount_on_equipment_or_item") return " from-[#20c0e878] to-[#20C0E8] ";
		if (type === "advance_and_discount_confirmation") return " from-[#faba1585] to-[#FABA15] ";
	}

	const checkboxHandler = (e, ele) => {
		// console.log("ele for active list : ", ele.sid = ele._id);
		if (e.target.checked) {
			ele.isAdded = true;
			console.log("in if");
			// setCheckBoxCheck(true)
			if (ele.sid) {
				ele.sid = ele.sid
			} else {

			ele.sid = ele._id
			}
			setActiveList(current => [...current, ele]);
		} else {
			console.log("in else");

			ele.isAdded = false;
			// setCheckBoxCheck(false)
			if (ele.sid) {
				setActiveList(current => current.filter(data => data.sid !== ele.sid))
			} else {
				setActiveList(current => current.filter(data => data._id !== ele._id))
			}
		}
	}
	console.log("active list on click : ", activeList);

	const editButtonHandler = (ele) => {
		setSelectedDiscount(ele);
		console.log("eid : ", ele);
		// if(ele.discountt,ype === "discount_on_total_bill") setServiceOn(false);
		// if(ele.discounttype === "discount_on_equipment_or_item") setServiceOn(true);
		// if(ele.discounttype === "advance_and_discount_confirmation") setServiceOn(false);
		setIsDiscountPopUpOpen(!isDiscountPopUpOpen);
	}
	// console.log("selected discount >> ", selectedDiscount);
	// console.log("active >> ", activeList);

	const handleSubmit = async () => {
		// console.log("in submit : ");

		// ----------------------------------
		// setSelectedDiscount({ ...selectedDiscount, 
		// 	// sid: selectedDiscount._id, 
		// 	sid: selectedDiscount._id, 
		// 	isAdded : "true",
		// 	discountname:selectedDiscount.discountname, 
		// 	// discounttype : selectedDiscount.discounttype, 
		// 	// description : selectedDiscount.description, 
		// 	discount: discount + "%", 
		// 	// tandc : selectedDiscount.tandc, 
		// 	// services : servicesList, 
		// 	// items : itemList, 
		// 	// equipments : eqipmentList, 
		// 	 });

		
		try {
			// const createresponse = await axios.put(`${baseUrl}/api/org/discount/${discountId}?event_id=${eventId}`,{equipment_id: selecetdServiceId, discount: value+"%"},{headers: header});
			// console.log(response);
			// handleClose(false);
			console.log("try");
			const reqObj = {
				eventid: eventId,
				discounts: activeList
			}
			console.log("active list : ", activeList);
	
			console.log("obj : ", reqObj);
	
			const createResponse = await axios.post(`${baseUrl}/organizer/events/discount`, reqObj, { headers: header });

			console.log("res :", createResponse);

			// handleClose(false);
		} catch (error) {
			console.log("Error", error);
		}
		// -----------------------------------------

		// setDiscount(discount);
		// setServicesList(servicesList);
		// setEqipmentList(eqipmentList);
		// setItemList(itemList);
		// // selectedDiscount.discount = 
		// handleClick(selectedDiscount.discount);
		// console.log("dis : ", discount);
		// handleClose(false);
	}

	return (
		//    <!-- Content In -->
		<div>
			<div className="wrapper min-h-full">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  --> */}
					<div className="flex justify-between items-center">
						<div className="flex items-center">
							<i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHandler}></i>
							<h1>{displayName}</h1>
						</div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<div className="w-full overflow-hidden">
						<StepProgressBar eventType={eventType} />
					</div>
					{/* <!-- main-content  --> */}
					<div className="space-y-5">
						{allDiscount.map(ele =>
							<div className="w-full flex items-center" id={ele._id} key={ele._id}>
								{/* {console.log("tf : ",  ele.isAdded)} */}
								<label className="checkbox w-16">
									<input type="checkbox" className="bg-white"
										checked={ele.isAdded}
										onChange={(e) => checkboxHandler(e, ele)}
									/>
									<i className="icon-right"></i>
								</label>
								<div className={gradientStyle(ele.discounttype) + "bg-gradient-to-r p-5 pr-8 relative overflow-hidden rounded-lg w-full"}>
									<div className="flex justify-between item-basline">
										<div>
											<h1 className="text-white">{ele.discountname}</h1>
											<div className="text-[40px] text-black font-bold">{ele.discount}</div>
											<span className="text-xs text-white font-normal">{ele.description}</span>
										</div>
										<div>
											<button onClick={() => editButtonHandler(ele)} className="bg-white p-2 rounded-md text-sm font-bold"><i className="text-sm edit text-black icon-edit mr-2"></i>Edit</button>
											<div className="absolute" style={{ right: "40px", top: "65%", transform: "scale(1.2)" }}>
												<img src={celebration} alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
					{/* <!-- next preview button --> */}
					<div className="prw-next-btn">
						<button type="button" className="flex items-center" onClick={clickBackHandler}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
						<button type="button" className="flex items-center active btn-primary" onClick={clickNextHandler}>Go To Calender</button>
					</div>
				</div>
			</div>

			<Modal isOpen={isDiscountPopUpOpen}>
				{/* {console.log("selected dis : ", selectedDiscount.discounttype )} */}
				{selectedDiscount.discounttype === "discount_on_total_bill" ?
					<EventPopUpDiscountOnTotalBill handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} activeList={activeList} />
					:
					<EventPopUpDiscountOnEquipmentOrItem handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} activeList={activeList} />}
				{/* <EventPopUpDiscount handleClose={setIsDiscountPopUpOpen} eventId={eventId} setSelectedDiscount={setSelectedDiscount} selectedDiscount={selectedDiscount} serviceOn={serviceOn} /> */}
			</Modal>
		</div>
	)
}

export default EventDiscounts