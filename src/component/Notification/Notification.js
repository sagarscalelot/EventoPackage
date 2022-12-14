import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



import NotificationLIstItem from "./NotificationLIstItem";
// import Advertisement from "../Advertisement";
import { baseUrl } from "../../config";
import axios from "axios";
import { MoonLoader } from 'react-spinners';



function Notification() {

  const params = useParams();
  const navigate = useNavigate();
  const [allNotifications, setAllNotifications] = useState([]);
  // const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token");
  localStorage.removeItem("notificationid");
  const limit = 5;
  const header = {
    'Authorization': `Token ${token}`
  }


  const getAllNotification = async () => {
    const requestObj = {
      // page: pageNo,
      limit: limit,
    }
    try {
      const response = await axios.post(`${baseUrl}/organizer/notification`, requestObj, { headers: header })
      setAllNotifications(response.data.Data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllNotification();
  }, []);
  return (

    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1>Notification</h1>
          </Link>
          <div className="flex items-center  space-x-5">
            <button className="btn-primary" onClick={() => navigate("/notification/history")}>
              <i className="icon-time mr-3"></i>
              <span>history</span>
            </button>
            <button className="btn-primary" onClick={() => navigate("/notification/details")} >
              <i className="icon-plus mr-3"></i>
              <span>Create new</span>
            </button>
          </div>
        </div>
        {/* <!-- main-content  --> */}
        <div className="space-y-5">
          <MoonLoader
            cssOverride={{ margin: "100px auto" }}
            color={"#20c0E8"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {allNotifications.docs?.map(ele => (
            <NotificationLIstItem key={ele._id} data={ele} />
          ))}
          {/* <!-- advisement --> */}
          {/* {!loading && <Advertisement />} */}
          {/* <!-- next preview button  --> */}
        </div>
      </div>
    </div>
  );
}

export default Notification;