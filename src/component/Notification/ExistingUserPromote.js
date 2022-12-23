import React from 'react'
import ExistingUserPromoteListItem from './ExistingUserPromoteListItem';
import NotificationProgressBar from '../Notification/NotificationProgressBar';
import { decrements, increments } from '../../redux/stepProgressNotification';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function ExistingUserPromote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const clickNextHandler = () => {
    dispatch(increments());
    navigate("../publishdatetime");
  }

  const clickBackHander = () => {
    dispatch(decrements());
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
      <div className="">
        <h3>Select User</h3>
        <div className="flex space-x-12 pt-5">
          <div className="w-1/2">
            <div className="space-y-3">
              <div className="flex items-center bg-white rounded-md cursor-pointer w-full p-4">
                <label className="checkbox w-8 h-8">
                  <input type="checkbox" className="bg-white" />
                  <i className="icon-right"></i>
                </label>
                <span className="text-base text-japaneseIndigo font-bold ml-5">Select All</span>
              </div>
              <ExistingUserPromoteListItem />
              <ExistingUserPromoteListItem />
              <ExistingUserPromoteListItem />
              <ExistingUserPromoteListItem />
              <ExistingUserPromoteListItem />

            </div>
          </div>
          <div className="w-1/2">
            <div className="max-w-max ml-auto text-base font-bold text-japaneseIndigo bg-white py-4 px-8 rounded-md">Total User : <span>512</span></div>
            <div className="upload-holder pt-5">
              <h3 className="flex items-end">Upload Excel</h3>
              <label htmlFor="upload2" className="upload py-14">
                <input type="file" name="images" id="upload2" className="appearance-none hidden" />
                <div className="mt-1 flex items-center justify-center"><i className="icon-excel text-base mr-2"></i> <span className="input-titel pt-1">Upload Excel</span></div>
              </label>
            </div>
          </div>
        </div>
        <div className="prw-next-btn mt-auto">
          <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
          <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
        </div>
      </div>
    </div>
  )
}

export default ExistingUserPromote;