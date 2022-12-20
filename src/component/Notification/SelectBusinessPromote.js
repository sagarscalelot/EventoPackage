import React from "react";
import NotificationProgressBar from '../Notification/NotificationProgressBar';
import { decrement, increment } from '../../redux/stepProgressNotification';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


function SelectBusinessPromote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const clickNextHandler = () => {
    dispatch(increment());
    navigate("../publishdatetime");
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
          <h3 className="pb-3">Select User</h3>
          <select className="bg-white rounded-md flex space-x-3 outline-0 px-6 py-[18px] relative arrow option">
            <option>Select All</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div className="bg-white p-[18px] rounded-md">
          <span className="text-base font-bold text-japaneseIndigo">
            Total User : 10000
          </span>
        </div>
      </div>
      <div className="prw-next-btn mt-auto">
        <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
        <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
      </div>
    </div>
  );
}

export default SelectBusinessPromote;