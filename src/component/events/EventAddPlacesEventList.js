import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config';
import Modal from "../modal/Modal";
import EventPopUpCreateNew from './popups/EventPopUpCreateNew';

function EventAddPlacesEventList({ displayName, categoryName, eventId }) {
    const [isCreateNewPopUpOpen, setIsCreateNewPopUpOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const params = useParams();
    const eventType = params.eventType;
    const event = localStorage.getItem("eventId");
    const header = {
        'Authorization': `Token ${token}`
    }
    const deleteClickHandler = async() => {
        try {
			const response = await axios.post(`${baseUrl}/organizer/events/remove`,{eventid:event},{headers: header});
			console.log("deleted event >> ",response.data);
                localStorage.removeItem('eventId');
                localStorage.removeItem('displayName');
                localStorage.removeItem('stepCount');
                navigate(-1);
                
		} catch (error) {
			console.log(error);
        }
    }

    const editClickHandler = () =>{
        setIsCreateNewPopUpOpen(true);
    }

    if (displayName !== "" && categoryName !== "")
        return (
            <div className="w-full flex items-center">
                <div className="w-full px-7 py-5 bg-white rounded">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2>{displayName}</h2>
                            <span className="text-sm text-spiroDiscoBall font-medium tracking-wider">{categoryName}</span>
                        </div>
                        <div className="flex">
                            <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pr-4 border-r border-quicksilver cursor-pointer" onClick={deleteClickHandler}><i className="icon-fill-delete mr-1"></i>Delete</div>
                            <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pl-4 cursor-pointer" onClick={editClickHandler}><i className="icon-edit mr-1"></i>Edit</div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isCreateNewPopUpOpen} >
		            <EventPopUpCreateNew handleClose={setIsCreateNewPopUpOpen} selectedCategory={categoryName} displayName={displayName} edit={true} eventId={eventId} />
	            </Modal>
            </div>
        );
    else if(displayName === "" && categoryName === "") return toast.error("Enable to show Event");
    else
        return "";
}

export default EventAddPlacesEventList;
