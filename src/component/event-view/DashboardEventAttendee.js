import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import Advertisement from '../Advertisement';
import { baseUrl } from '../../config';
import DashboardEventAtteneeListItem from './DashboardEventAtteneeListItem';

function DashboardEventAttendee() {
    const [allEvents, setAllEvents] = useState([]);
    const token = localStorage.getItem("Token");
    const eventId = localStorage.getItem("eventId");
  
    const header = {
      'Authorization': `Token ${token}`
    }
    const getEventById = async () => {
      try {
        const response = await axios.get(`${baseUrl}/organizer/events/getone?eventid=${eventId}`, { headers: header });
        setAllEvents(response.data.Data.attendee);
  
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getEventById();
    }, []);
    return (
        <div className="pt-7 lg:pt-10">
            {/* <!-- Attendee-Teb-Content   --> */}
            <div className="w-full space-y-7" id="attendee">
                <div className="w-full space-y-2.5">
                {allEvents.map(ele => (
					<>
					  <DashboardEventAtteneeListItem key={ele._id} data={ele}  />
					</>
				))}
                </div>
                {/* <!-- calendar end --> */}
                {/* <Advertisement /> */}
            </div>
        </div>
    )
}

export default DashboardEventAttendee;