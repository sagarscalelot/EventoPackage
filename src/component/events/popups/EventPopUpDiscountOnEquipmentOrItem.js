import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../config';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import { options } from '@fullcalendar/core/preact';

function EventPopUpDiscountOnEquipmentOrItem({ handleClose, eventId, setSelectedDiscount, selectedDiscount, serviceOn, activeList }) {
	const [discount, setDiscount] = useState("");
	const [serviceList, setServiceList] = useState([]);
	const [itemList, setItemList] = useState([]);
	const [eqipmentList, setEqipmentList] = useState([]);
	const [error, setError] = useState("");

	const [selecetdServiceId, setSelectedServiceId] = useState("");
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}

	const services = [];
	const equipmens = [];
	// const items = [];
	// console.log("list : ", activeList);

	const getServiceList = async () => {
		try {
			const eventDetails = await axios.get(`${baseUrl}/organizer/events/discount/getselectservice?eventid=${eventId}`, { headers: header });

			// console.log("event services : ", eventDetails.data.Data?.services);
			// console.log("event equipmens : ", eventDetails.data.Data?.equipments);
			console.log("event items : ", eventDetails?.data.Data);

			// eventDetails?.data?.Data.items.map((e) => (
			// 	setItemList(current => [...current, (e.name, e._id)])
			// 	// items.push(e.name)	

			// ))
			console.log("i : ", items);
			setServiceList(eventDetails.data.Data?.services);
			setEqipmentList(eventDetails.data.Data?.equipments);
			setItemList(eventDetails.data.Data?.items);

		} catch (error) {
			console.log(error);
		}
		console.log("ilist : ", itemList);
		const items = [itemList];

	}

	useEffect(() => {
		getServiceList();
	}, []);

	const optionChangeHandler = (e) => {
		return e.map(ele => {
			setSelectedServiceId(cuurent => [...cuurent, ele.value])
		})
		console.log(selecetdServiceId);
	}

	const validateDiscount = (e) => {
		if ((e.target.value <= 100) && (e.target.value >= 0)) {
			setDiscount(e.target.value);
			selectedDiscount.discount = e.target.value + "%";
			setError(null);
		} else {
			setError("Enter Valid Discount value");
		}

	}

	const handleSubmit = async () => {
		setDiscount(discount);
		handleClose(false);
	}


	const handleChange = e => {
		console.log("selected services : ", e);
	};

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
									{/* <select onChange={handleChange} multiple className="w-full arrow option"  >
										{serviceList.map((e, i) => (
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
									</select> */}
									{/* <Select
										// defaultValue={[itemList[0], itemList[1]]}
										isMulti
										// isObject={false}
										// name="colors"
										options={items}
										className="basic-multi-select"
										classNamePrefix="select"
									/> */}
									
									{/* <Multiselect
										options={itemList} // Options to display in the dropdown
										displayValue="name"
										isObject={false}
										onRemove={(e) => console.log(e)}	
										onSelect={(e) => console.log(e._id)}
										// showCheckbox	
										className="w-full arrow option"
										/> */}
								</div>
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