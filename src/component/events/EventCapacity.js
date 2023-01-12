import React, { useState, useEffect, useCallback } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';


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

  const ValidationSchema = Yup.object().shape({
    person_capacity: Yup.number().typeError('Person Capacity must be a digit').integer().positive("Person Capacity must be positive").required("Person Capacity is required"),
    parking_capacity: Yup.number().typeError('Parking Capacity must be a digit').integer().positive("Parking Capacity must be positive").required("Parking Capacity is required")
  });


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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };
  // console.log(values);



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
        formik.setValues(response.data.Data.capacity);
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
    console.log("co : ", coordinates[0]);
  }
  useEffect(() => {
    getCapacity();
    getLiveLocation();
  }, []);



  const clickNextHandler = async (values) => {
    if (!onlyDigits.test(values.parking_capacity.trim()) || !onlyDigits.test(values.person_capacity.trim())) {
      toast.warn("Please Enter valid capacity.");
      return
    }
    try {
      const response = await axios.post(`${baseUrl}/organizer/events/capacity`, { ...values, facilities: type, eventid: eventId }, { headers: header });
      if (response.data.IsSuccess) {
        // toast.success(response.data.Message);
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

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: ValidationSchema,
    onSubmit: clickNextHandler,
  });

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        // setStatus(null);
        console.log(position.coords.latitude, position.coords.longitude);
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        values.location = {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        };
        // setLat(position.coords.latitude);
        // setLng(position.coords.longitude);
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }


  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );


  return (
    //   <!-- Content In -->
    <form onSubmit={formik.handleSubmit}>
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
                <label htmlFor="selact" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_stay" && true} onChange={(e) => setType("romantic_stay")} />
                  <h3 className="text-base">Romantic Stay</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlFor="selact1" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select1" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_lunch_dinner" && true} onChange={(e) => setType('romantic_lunch_dinner')} />
                  <h3 className="text-base">Romantic Lunch / Dinner</h3>
                </label>
              </div>
              <div className="w-full lg:w-1/3 px-3.5">
                <label htmlFor="selact2" className="p-5 py-4 bg-white rounded-md flex space-x-3 cursor-pointer">
                  <input type="radio" name="type" id="select2" className="w-6 h-6 rounded-full bg-brightGray appearance-none cursor-pointer" checked={type === "romantic_candlelight_dinner" && true} onChange={(e) => setType('romantic_candlelight_dinner')} />
                  <h3 className="text-base">Romantic Candlelight Dinner</h3>
                </label>
              </div>
            </div>
            <div className="w-full inputHolder">
              <span className="input-titel">person capacity</span>
              <input type="text" className="input font-bold" name="person_capacity" value={formik.values?.person_capacity} onChange={(e) => setInputValue("person_capacity", e.target.value)} />
            </div>
            <small className="text-red-500 text-xs">{formik.errors.person_capacity}</small>
            <div className="w-full inputHolder">
              <span className="input-titel">Parking Capacity</span>
              <input type="text" className="input font-bold" name="parking_capacity" value={formik.values?.parking_capacity} onChange={(e) => setInputValue("parking_capacity", e.target.value)} />
            </div>
            <small className="text-red-500 text-xs">{formik.errors.parking_capacity}</small>
            <div className="w-full relative">
              <button type='button' className='absolute bottom-3 right-3 bg-spiroDiscoBall text-base capitalize font-semibold text-white px-7 py-3 rounded-md z-40' onClick={getLiveLocation}>Get Live Location</button>
              <span className="input-titel">Address</span>
              <span className="input-titel">{values.address}</span>
              <div className="w-full flex flex-wrap bg-white p-2 rounded-md min-h-[300px] xl:min-h-[400px]">
                <div className="relative rounded-md w-full">
                  {console.log("add : ", values.location.coordinates)}
                  {Object.keys(values.location).length === 0 ? (
                    <>
                      <AutoPlaceSearch
                        handleClick={handleClick}
                        coordinates={{
                          type: "Point",
                          coordinates: [coordinates[0], coordinates[1]]
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
          <button type="submit" className="flex items-center active"><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
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
    </form>
  )
}

export default EventCapacity