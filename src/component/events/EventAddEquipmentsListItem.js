import axios from 'axios';
import React, {  useState } from 'react';
import { baseUrl, s3Url } from '../../config';
import Modal from '../modal/Modal';
import EventPopUpAddEquipment from './popups/EventPopUpAddEquipment';
import imagePreview from "../../assest/images/image-preview.png";

function EventAddEquipmentsListItem({data, edit, eventId, setReload, setActiveList, activeList}) {
	
	const [isAddServicesPopUpOpen, setIsAddServicesPopUpOpen] = useState(false);
	const [isLive, setIsLive] = useState(false);
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}
	const deleteHandler = async() =>{
		console.log(data._id);
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/removeequipment`, {equipmentid: data._id}, {headers: header});
			console.log("Equipment Deleted >> ",response);
			setReload(current => !current);
		} catch (error) {
			console.log(error);
			console.log("Something went Wrong");
		}
	}

	const addService = () => {
		if(isLive && !activeList.includes(data._id)) {
			setActiveList(current => [...current, data._id]);
		}
		if(activeList.includes(data._id)) {
			setActiveList(current => current.filter(e => e !== data._id))
		}
		// toggleService();
	}

	const toggleService = async(e) => {
		let equipmentList = [];
		try {
			if(e.target.checked) {
				equipmentList = [...activeList, data._id];
				console.log("Checked",equipmentList );
			} else {
				equipmentList = [...activeList.filter(e => e !== data._id)];
				console.log("Not Checked", equipmentList);
			}
			console.log("activeList>>>>>>",equipmentList);
			const response = await axios.post(`${baseUrl}/organizer/events/selectequipment`, {eventid: eventId, equipments: equipmentList}, {headers: header});
			setReload(current => !current);
			console.log("Equipment active>> ",response);
		} catch (error) {
			console.log("Something went Wrong.");
			console.log(error);
		}
	}

  return (
    <div className="bg-white rounderd px-7 py-4">
			 <div className="flex justify-between">
			   <div className="">
				 <div className="w-28 h-28 border-2 border-brightGray rounded-md">
				   <img src={data?.photos[0]?.url ? s3Url+"/"+data.photos[0]?.url : imagePreview} alt="" className="w-full h-full object-cover"/>
				 </div>
			   </div>
			   <div className="w-full pl-5">
				 <div className="flex justify-between">
				   <h2>{data.name}</h2>
				   <div className="flex items-center space-x-5">
					 <div className="flex items-center">
					   <input type="checkbox" checked={activeList.includes(data?._id)} id="on" className="switch mx-3 order-2" onChange={toggleService} />
					   <span className="off text-base font-bold anim order-1 text-caribbeanGreen">Off</span>
					   <span className="on text-base font-bold anim order-3">On</span>
					 </div>
					 {data.quantity && <span
					   className="inline-block text-base text-spiroDiscoBall font-bold bg-brightGray py-1.5 px-3.5 rounded">{data.quantity} Qty</span>}
					 <a href="#" title="Delete" onClick={deleteHandler}><i className="text-center icon-fill-delete text-xl"></i></a>
					 <a href="#" title="Edit" onClick={()=>setIsAddServicesPopUpOpen(true)}><i className="text-center icon-edit text-xl"></i></a>
				   </div>
				 </div>
				<p className="text-quicksilver text-sm font-normal leading-6 pt-3 xl:max-w-[90%]"> {data.description} </p>
				 <h3 className="text-right">{data.price} INR</h3>
			   </div>
			 </div>
			 <Modal isOpen={isAddServicesPopUpOpen}>
				<EventPopUpAddEquipment handleClose={setIsAddServicesPopUpOpen} data={data} edit={edit} setReload={setReload} />
	 		</Modal>
		   </div>
  )
}

export default EventAddEquipmentsListItem;
