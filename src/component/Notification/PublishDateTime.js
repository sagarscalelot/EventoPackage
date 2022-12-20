import React from "react";
import NotificationProgressBar from './NotificationProgressBar';
import { decrement, increment } from '../../redux/stepProgressNotification';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


function PublishDateTime() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const clickNextHandler = () => {
    dispatch(increment());
    navigate("../notificationmode");
  }

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }
  return (
    <div className="wrapper min-h-full">
      {/* <!-- title-holder  -->/ */}
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={clickBackHander}><i className="icon-back-arrow mr-4 text-2xl"></i>
          <h1>Promote</h1>
        </div>
      </div>
      <br />
      <NotificationProgressBar />
      <br />
      <div className="flex items-end justify-between">
        <div className="w-1/2">
          <h3 className="pb-3">Date</h3>
          <div className="bg-white p-[18px] rounded-md">

            <span className="text-base font-bold text-japaneseIndigo">
              Date
            </span>
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="pb-3">Time</h3>
          <div className="bg-white p-[18px] rounded-md">

            <span className="text-base font-bold text-japaneseIndigo">
              Time
            </span>
          </div>
        </div>

      </div>
      <br />
      <div className="w-1/2">
        <h3 className="pb-3">Select Category</h3>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" className="bg-white" />
            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">Notifications</span>
        </div>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" className="bg-white" />
            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">SMS</span>
        </div>
        <div className="flex items-center  rounded-md cursor-pointer w-full p-4">
          <label className="checkbox w-8 h-8">
            <input type="checkbox" className="bg-white" />
            <i className="icon-right"></i>
          </label>
          <span className="text-base text-japaneseIndigo font-bold ml-5">Email</span>
        </div>
      </div>
      <div className="prw-next-btn mt-auto">
        <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
        <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
      </div>
    </div>
  );
}

export default PublishDateTime;