import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../config';
// import getEventType from '../../shared/helper';
import {getEventType} from '../../../shared/helper';
function EventPopUpCategory({handleClose}) {

	const params = useParams();

	const [catagoryInputName, setcatagoryInputName] = useState();
	// console.log(catagoryInputName);
	const token = localStorage.getItem("Token");
	// const eventType = localStorage.getItem("event_type");
	const eventType = getEventType(params.eventType);

	const header = {
		'Authorization': `Token ${token}`
	}

	const addCategory = async() => {

		const reqObj = {
			category_name : catagoryInputName,
			event_type : eventType
		}

		try {

			const response = await axios.post(`${baseUrl}/organizer/events/addcategory`,{"category_name": catagoryInputName, "event_type":"personal_skills_business"},{headers: header});

			console.log(response);
			if(response.data.IsSuccess) {
				toast.success(response.data.Message);
			} else {
				toast.error(response.data.Message);
			}
			handleClose(false);
		} catch (error) {
			toast.error("Something Went Wrong.");
			console.log(error);
		}
	}

  return (
	//  <!-- Add Category  -->
	 <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
	 <div className="table-cell align-middle">
	   <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
		 <div className="bg-brightGray p-12">
		   <div className="flex justify-between items-center">
			 <h1 className="h1">Add Category</h1>
			 <div>
			   <button onClick={()=>handleClose(false)} className="text-xl"><i className="icon-close"></i></button>
			 </div>
		   </div>
		   <form className="py-7">
			 <div className="w-full inputHolder">
			   <label className="input-titel">Category Name</label>
			   <input className="input" type="text" onChange={(e) => setcatagoryInputName(e.target.value)}/>
			 </div>
		   </form>
		   <div className="btn-primary w-full uppercase" onClick={addCategory}>Submit</div>
		 </div>
	   </div>
	 </div>
   </div>
  )
}

export default EventPopUpCategory