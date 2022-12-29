import React, {useEffect,useState} from 'react'
import axios from 'axios';
import { baseUrl } from '../../config';
import user1Image from "../../assest/images/user-1.png";
import user2Image from "../../assest/images/user-2.png";
// import Advertisement from '../Advertisement';
import DashboardEventReviewListItem from './DashboardEventReviewListItem';

function DashboardEventReview() {
  const [allEvents, setAllEvents] = useState([]);
  const token = localStorage.getItem("Token");
  const eventId = localStorage.getItem("eventId");

  const header = {
    'Authorization': `Token ${token}`
  }
  const getEventById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/organizer/events/getone?eventid=${eventId}`, { headers: header });
      setAllEvents(response.data.Data.reviews);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventById();
  }, []);
  console.log("Reviews", allEvents);
  return (
      
    <div className="pt-7 lg:pt-10">
      {/* <!-- Reviews-Teb-Content   --> */}
      <div className="w-full space-y-7" id="reviews">
        <div className="w-full space-y-2">

        {allEvents.map(ele => (
					<>
					<div className="w-full flex items-center ">
					
						<DashboardEventReviewListItem key={ele._id} data={ele}  />
						</div>
					</>
				))}




          {/* <DashboardEventReviewListItem userImage={user1Image} />
          <DashboardEventReviewListItem userImage={user2Image} /> */}
        </div>
        {/* <!-- calendar end --> */}
        {/* <Advertisement /> */}
      </div>
    </div>
  )
}

export default DashboardEventReview;
