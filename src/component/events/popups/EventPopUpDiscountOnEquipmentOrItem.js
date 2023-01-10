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
	const [items, setItems] = useState([]);
	const [preItems, setPreItems] = useState([]);
	const [selecetdServiceId, setSelectedServiceId] = useState("");
	const token = localStorage.getItem("Token");
	const [selectList, setSelectList] = useState([]);
	const [preSelectList, setPreSelectList] = useState([]);
	const [isValid, setIsValid] = useState(false)

	const header = {
		'Authorization': `Token ${token}`
	}

	let listStore = []

	const [list, setList] = useState([]);
	const [itemsStore, setItemsStore] = useState([]);
	const [filterIds, setFilterIds] = useState([]);
	// console.log("list : ", activeList);

	const getServiceList = async () => {
		try {
			const eventDetails = await axios.get(`${baseUrl}/organizer/events/discount/getselectservice?eventid=${eventId}`, { headers: header });
			if (eventDetails?.data.IsSuccess) {
				try {
					const res = await axios.get(`${baseUrl}/organizer/events/discount?eventid=${eventId}`, { headers: header });
					// get equipment or item part
					res?.data?.Data?.discounts.filter(type => (type.discounttype === "discount_on_equipment_or_item")).map((e, i) => {
						eventDetails?.data?.Data.map((m, i) => {
							let isMatched = false;
							e.services.map((o) => {
								if (o === m._id) {
									console.log("if");
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
							e.equipments.map((o) => {
								if (o === m._id) {
									console.log("if");
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
							e.items.map((o) => {
								if (o === m._id) {
									console.log("if");
									isMatched = true;
									setList(current => [...current, e]);
									setPreSelectList(cuurent => [...cuurent, m])
								}
							})
						})
						// if ((e.services.length === 0) && (e.equipments.length === 0) && (e.items.length === 0)) {
						// 	console.log("all zero");
						// }
					})
					setSelectList(eventDetails?.data?.Data);
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getServiceList();
	}, []);

	const optionChangeHandler = (e) => {
		console.log("e : ", e);
		return e.map(ele => {
			setSelectedServiceId(cuurent => [...cuurent, ele.value])
		})
		console.log(selecetdServiceId);
	}

	const validateDiscount = (e) => {
		setIsValid(false)
		if (!e.target.value || e.target.value == '') {
			setError("Discount Is Required");
			handleClose(true)
		} else if ((e.target.value <= 100) && (e.target.value >= 0)) {
			setDiscount(e.target.value);
			console.log("D :", e.target.value);
			selectedDiscount.discount = e.target.value + "%";
			setError(null);
			setIsValid(true)
		} else {
			handleClose(true)
			setError("Enter Valid Discount value");
		}

	}

	const handleSubmit = async () => {
		if (isValid) {
			setDiscount(discount);
			selectedDiscount.services = [];
			selectedDiscount.equipments = [];
			selectedDiscount.items = [];
			console.log("list : ", list);
			list.map((e, i) => {
				e.isAdded = true;
				e.type === "service" ? (selectedDiscount.services).push(e._id) :
					((e.type === "equipment" ? (selectedDiscount.equipments).push(e._id) :
						(selectedDiscount.items).push(e._id)))
			})
			handleClose(false);
		}
	}

	// const val = [
	// 	{ name: "Option 1", cat: "Group 1" },
	// 	{ name: "Option 2", cat: "Group 1" }
	// ]

	return (
		<>

			<div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
				<div className="table-cell align-middle">
					<div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
						<div className="bg-brightGray p-7 space-y-7">
							<h2 className="h1 w-full max-w-[60%] text-center mx-auto"> {selectedDiscount?.discountname} </h2>
							<form className="flex items-center space-x-5">
								<div className="w-full lg:w-2/3 inputHolder">
									<label className="input-titel">Equipment Or Item</label>
									<Multiselect
										options={selectList} // Options to display in the dropdown
										displayValue="name"
										// isObject={false}
										onRemove={(e) => setList(e)}
										selectedValues={preSelectList}
										onSelect={(e) => setList(e)}
										// showCheckbox	
										className="w-full arrow option input-0 bg-white rounded"
									/>
								</div>
								<div className={serviceOn ? "w-full inputHolder" : "w-full lg:w-1/3 inputHolder"}>
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