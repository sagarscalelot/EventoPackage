import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../config';
import Select from 'react-select';
import { current } from '@reduxjs/toolkit';

function EventPopUpDiscountOnEquipmentOrItem({ handleClose, eventId, setSelectedDiscount, selectedDiscount, serviceOn, activeList }) {
	// console.log("props : ", selectedDiscount);
	const [discount, setDiscount] = useState("");
	const [servicesList, setServicesList] = useState([]);
	const [itemList, setItemList] = useState([]);
	const [eqipmentList, setEqipmentList] = useState([]);
	const [error, setError] = useState("");

	const [selecetdServiceId, setSelectedServiceId] = useState("");
	const [fetchedDiscount, setFetcheddiscount] = useState(selectedDiscount.discount); 
	// console.log(servicesList);
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}

	console.log("list : ", activeList);

	const getServiceList = async () => {
		try {
			// setServiceList([]);
			const eventDetails = await axios.get(`${baseUrl}/organizer/events/getone?eventid=${eventId}`, { headers: header });

			console.log("event services : ", eventDetails.data.Data?.services);
			console.log("event items : ", eventDetails.data.Data?.items);
			// console.log("event equipments : ", eventDetails.data.Data?.equipments);

			setServicesList(eventDetails.data.Data?.services);
			setEqipmentList(eventDetails.data.Data?.equipments);
			setItemList(eventDetails.data.Data?.items);
			// const responseServise = await axios.get(`${baseUrl}/organizer/events/getselectservice?eventid=${eventId}`, { headers: header });
			// setServicesList([]);
			// servicesList.map(ele => {
			// 	setServicesList(current => [...current, { value: ele._id, label: ele.name }]);
			// })
			// eqipmentList.map(ele => {
			// 	setEqipmentList(current => [...current, { value: ele._id, label: ele.name }]);
			// })
			// itemList.map(ele => {
			// 	setItemList(current => [...current, { value: ele._id, label: ele.name }]);
			// })
			// console.log("services >> ", responseServise.data.Data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getServiceList();
	}, []);

	const optionChangeHandler = (e) => {
		e.map(ele => {
			setSelectedServiceId(cuurent => [...cuurent, ele.value])
		})
		console.log(selecetdServiceId);
	}

	const validateDiscount = (e) => {
		if ((e.target.value <= 100) && (e.target.value >= 0)) {
			setDiscount(e.target.value);
			selectedDiscount.discount = e.target.value + "%";
			// selectedDiscount.sid = selectedDiscount._id;
			setError(null);	
		} else {
			setError("Enter Valid Discount value");
		}
		// console.log("fetched dis : ", discount);

	}

	// let b = setSelectedDiscount({ ...selectedDiscount, sid: selectedDiscount._id, discountname:selectedDiscount.discountname, discounttype : selectedDiscount.discounttype, description : selectedDiscount.description, discount: discount + "%", tandc : selectedDiscount.tandc, services : servicesList, items : itemList, equipments : eqipmentList});

	
	const handleSubmit = async () => {
		
		// ----------------------------------
		// setSelectedDiscount({ ...selectedDiscount, sid: selectedDiscount._id, discountname:selectedDiscount.discountname, discounttype : selectedDiscount.discounttype, description : selectedDiscount.description, discount: discount + "%", tandc : selectedDiscount.tandc, services : servicesList, items : itemList, equipments : eqipmentList, isAdded : "true" });

		// const reqObj = {
		// 	eventid : eventId,
		// 	discounts : [selectedDiscount]
		// }
		// console.log("eventId :>>>>>>>>>>>>>>>>>>>>>>>>> ", reqObj);

		// console.log("dis before create : ",activeList);
		// try {
		// 	// const response = await axios.put(`${baseUrl}/api/org/discount/${discountId}?event_id=${eventId}`,{equipment_id: selecetdServiceId, discount: value+"%"},{headers: header});
		// 	// console.log(response);
		// 	// handleClose(false);
		// 	console.log("try");
		// 	const response = await axios.post(`${baseUrl}/organizer/events/discount`,reqObj,{headers: header});

		// 	console.log("res :", response);

		// 	handleClose(false);
		// } catch (error) {
		// 	console.log("Error",error);
		// }
		// -----------------------------------------

		setDiscount(discount);
		// setServicesList(servicesList);
		// setEqipmentList(eqipmentList);
		// setItemList(itemList);
		// selectedDiscount.discount = 
		// handleClick(selectedDiscount.discount);
		console.log("dis : ", discount);
		console.log("list : ", eqipmentList, itemList);

		handleClose(false);
	}


	const handleChange = e => {
		// e.map(ele => {
			// setSelectedServiceId(cuurent => [...cuurent, e.target.value])
		// })
		// setSelectedServiceId(e.target.value)
		console.log("selected services : ", e);
		// // selectedDiscount.services = e.target.value;
		// // setSelectedDiscount({ ...selectedDiscount, services : e.target.value})
		// // setSelectedServiceId(cuurent => [...cuurent, e.target.value])
		// console.log("selected services : ", selecetdServiceId);
	};

	// const arr = [
	// 	{value: '', text: '--Choose an option--'},
	// 	{value: 'apple', text: 'Apple 🍏'},
	// 	{value: 'banana', text: 'Banana 🍌'},
	// 	{value: 'kiwi', text: 'Kiwi 🥝'},
	//   ];


	//  const ColourOption = [
	// 	{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
	// 	{ value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
	// 	{ value: 'purple', label: 'Purple', color: '#5243AA' },
	// 	{ value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
	// 	{ value: 'orange', label: 'Orange', color: '#FF8B00' },
	// 	{ value: 'yellow', label: 'Yellow', color: '#FFC400' },
	// 	{ value: 'green', label: 'Green', color: '#36B37E' },
	// 	{ value: 'forest', label: 'Forest', color: '#00875A' },
	// 	{ value: 'slate', label: 'Slate', color: '#253858' },
	// 	{ value: 'silver', label: 'Silver', color: '#666666' },
	//   ];
	return (
		<>
			{/* //  <!--  Discount on Particular Equipment Or Item  --> */}
			{/* {console.log("list : ", itemList.map((e, i) => (
				e.name
			)))} */}
			<div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
				<div className="table-cell align-middle">
					<div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
						<div className="bg-brightGray p-7 space-y-7">
							<h2 className="h1 w-full max-w-[60%] text-center mx-auto"> {selectedDiscount?.discountname} </h2>
							<form className="flex items-center space-x-5">
								{/* {
								serviceOn && <div className="w-full lg:w-1/2 inputHolder">
									<label className="input-titel">Equipment Or Item</label>
									<Select className="w-full arrow option" options={servicesList} isMulti onChange={(e) => optionChangeHandler(e)} />
								</div>
							} */}

								<div className="w-full lg:w-1/2 inputHolder">
									<label className="input-titel">Equipment Or Item</label>
									{/* <Select options={options} /> */}
									<select onChange={handleChange}  className="w-full arrow option"  >
										{servicesList.map((e, i) => (
											<option key={i} value={e}>
												{e.name}
											</option>
										))}
										{eqipmentList.map((e, i) => (
											<option key={i} value={e}>
												{e.name}
											</option>
										))}
										{itemList.map((e, i) => (
											<option key={i} value={e}>
												{e.name}
											</option>
										))}
									</select>
								</div>
								{/* <Select
    defaultValue={}
    isMulti
    name="colors"
    options={ColourOption}
    className="basic-multi-select"
    classNamePrefix="select"
  /> */}
								<div className={serviceOn ? "w-full lg:w-1/2 inputHolder" : "w-full inputHolder"}>
									<label className="input-titel">Discount</label>
									<input className="input option" type="text" onChange={validateDiscount} />
									<span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{error} </span>
								</div>
							</form>
							<ul className="space-y-2.5">
								<li className="text-xs font-medium">* Terms & Conditions</li>
								{selectedDiscount?.tandc}
							</ul>
							<div className="flex items-center space-x-5">
								<button onClick={() => handleClose(false)} className="btn-primary btn-cancel w-full">CANCEL</button>
								<button onClick={handleSubmit} className="btn-primary w-full">APPLY</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EventPopUpDiscountOnEquipmentOrItem