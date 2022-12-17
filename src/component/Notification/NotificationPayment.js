import React from "react";
import { Link } from "react-router-dom";
import NotificationProgressBar from './NotificationProgressBar';
import { decrement, increment } from '../../redux/stepProgressNotification';
import {  useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function NotificationPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


const clickNextHandler =()=>{
  dispatch(increment());
  navigate("../notificationpayment");
}

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }
  return (
    <>
       <div className="wrapper min-h-full">
    {/* <!-- title-holder  -->/ */}
    <div className="flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={clickBackHander}><i className="icon-back-arrow mr-4 text-2xl"></i>
        <h1>Promote</h1>
      </div>
    </div>
    <br/>
    <NotificationProgressBar/>
    <br/>
      <h3>Payment</h3>
      <div className="">
        <div className="flex items-end flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">Card Holder Name</span>
            <input type="text" className="input" />
          </div>
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">Card Number</span>
            <input type="text" className="input" />
          </div>
        </div>
        <div className="flex items-end flex-wrap -mx-2 pt-5">
          <div className="w-full md:w-1/2 px-2 inputHolder">
            <span className="input-titel">Expiry Date</span>
            <input type="text" className="input" />
          </div>
          <div className="w-full md:w-1/2 px-2 inputHolder relative">
            <span className="input-titel">CVV</span>
            <input type="text" className="input" />
            <Link to="/" className="absolute top-1/2 mt-1 right-5">
              <i className="icon-pass-hide mr-5"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="prw-next-btn mt-auto">
		 <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
		 <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
	   </div>
    </div>
    
    </>
  );
}

export default NotificationPayment;
