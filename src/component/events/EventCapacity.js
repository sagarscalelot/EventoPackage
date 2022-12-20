import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import Advertisement from '../Advertisement';
import StepProgressBar from './StepProgressBar';
import { decrement, increment } from '../../redux/stepProgressCount';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../config';
import axios from 'axios';
import { onlyDigits } from "../../shared/constants";
import AutoPlaceSearch from "../AutoPlaceSearch";

function EventCapacity() {
  const displayName = localStorage.getItem("displayName");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const eventType = params.eventType;
  const eventId = localStorage.getItem("eventId");
  const token = localStorage.getItem("Token");
  const header = {
    'Authorization': `Token ${token}`
  }

  const [type, setType] = useState("romantic_stay");
  const [coordinates, setCoordinates] = useState([]);

  const initialState = {
    eventid: eventId,
    person_capacity: "",
    parking_capacity: "",
    address: "",
    location: {
      type: "Point",
      coordinates: [coordinates[0], coordinates[1]],
    },
  }

  const [values, setValues] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  console.log(values);

  const handleClick = (address, lng, lat) => {
    setCoordinates([lng, lat]);
    values.address = address;
    values.location = {
      type: "Point",
      coordinates: [lng, lat],
    };
  };


  const getCapacity = async () => {
    try {
      const response = await axios.get(`${baseUrl}/organizer/events/capacity?eventid=${eventId}`,
        { headers: header });
      if (response.data.Data.capacity) {
        setValues(response.data.Data.capacity);
        if ('facilities' in response.data.Data.capacity) {
          setType(response.data.Data.capacity?.facilities);
        }
      }
      if (!response.data.IsSuccess) {
        toast.error("Error occured while fetching data.")
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCapacity();
  }, []);

  const clickNextHandler = async () => {
    if (!onlyDigits.test(values.parking_capacity.trim()) || !onlyDigits.test(values.person_capacity.trim())) {
      toast.warn("Please Enter valid capacity.");
      return
    }
    try {
      const response = await axios.post(`${baseUrl}/organizer/events/capacity`, { ...values, facilities: type, eventid: eventId }, { headers: header });
      if (response.data.IsSuccess) {
        toast.success(response.data.Message);
        dispatch(increment());
        navigate(`../companydetails`);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something went Wrong.");
      console.log(error);
    }

  }

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }

  return (
    //   <!-- Content In -->
    <div>
      <div className="wrapper min-h-full">

        <div className="space-y-8 h-full">
          {/* <!-- title-holder  --> */}
          <div className="flex justify-between items-center">
            <div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i><h1>{displayName}</h1></div>
          </div>
          {/* <!-- step-progress-bar  --> */}
          <StepProgressBar eventType={eventType} />
          {/* <!-- main-content  --> */}
          <div className="space-y-5">
            <div className="flex items-end -mx-3.5">
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlfor="selact" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_stay" && true} onChange={(e) => setType("romantic_stay")} />
                  <h3 className="text-base">Romantic Stay</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlfor="selact1" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select1" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_lunch_dinner" && true} onChange={(e) => setType('romantic_lunch_dinner')} />
                  <h3 className="text-base">Romantic Lunch / Dinner</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlfor="selact2" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select2" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_candlelight_dinner" && true} onChange={(e) => setType('romantic_candlelight_dinner')} />
                  <h3 className="text-base">Romantic Candlelight Dinner</h3>
                </label>
              </div>
            </div>
            <div className="w-full inputHolder">
              <span className="input-titel">person capacity</span>
              <input type="text" className="input font-bold" name="person_capacity" value={values.person_capacity} onChange={handleInputChange} />
            </div>
            <div className="w-full inputHolder">
              <span className="input-titel">Parking Capacity</span>
              <input type="text" className="input font-bold" name="parking_capacity" value={values.parking_capacity} onChange={handleInputChange} />
            </div>
            <div className="w-full relative">
              <span className="input-titel">Address</span>
              <span className="input-titel">{values.address}</span>
              <div className="w-full flex flex-wrap bg-white p-2 rounded-md min-h-[220px] xl:min-h-[300px]">
                <div className="relative rounded-md w-full">
                  {console.log("add : ", values.location.coordinates)}
                  {Object.keys(values.location).length === 0 ? (
                    <>
                      <AutoPlaceSearch
                        handleClick={handleClick}
                        coordinates={{
                          type: "Point",
                          coordinates: [72.807623, 21.221723]
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <AutoPlaceSearch
                        handleClick={handleClick}
                        coordinates={values.location}
                        add={values.address}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- advisement --> */}
          {/* <Advertisement /> */}
        </div>
        <div className="prw-next-btn">
          <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
          <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default EventCapacity