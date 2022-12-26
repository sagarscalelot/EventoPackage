import React,{useState} from "react";
import NotificationProgressBar from './NotificationProgressBar';
import { decrements, increments } from '../../redux/stepProgressNotification';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Modal from "../modal/Modal";
import NotificationCouponPopUp from "./popups/NotificationCouponPopUp";

function NotificationMode() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNotificationDetailPreviewPopupOpen, setIsNotificationDetailPreviewPopupOpen] = useState(false);

  const [handleClose, setHandleClose] = useState(false)
  const clickNextHandler = () => {
    dispatch(increments());
    navigate("../notificationpayment");
  }

  const clickBackHander = () => {
    dispatch(decrements());
    navigate(-1);
  }
  return (
    <>

      <div className="">
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
          <h3>Bill Details</h3>
          <div className="bg-white rounded p-8 mt-6 space-y-5">
            <div className="flex items-start">
              <i className="w-8 icon-bell text-2xl mr-5"></i>
              <div className="w-full flex justify-between">
                <div className="">
                  <p className="text-base text-japaneseIndigo font-bold">
                    Notification
                  </p>
                  <span className="text-sm text-gray-300 font-normal">(Free)</span>
                </div>
                <div className="flex items-center text-2xl text-japaneseIndigo">
                  <i className="icon-rs rs-black text-base mr-3"></i>0
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <i className="w-8 icon-fill-massage text-2xl mr-5"></i>
              <div className="w-full flex justify-between">
                <div className="">
                  <p className="text-base text-japaneseIndigo font-bold">SMS</p>
                  <span className="text-sm text-gray-300 font-normal">
                    280 Phone Number x 0.18
                  </span>
                </div>
                <div className="flex items-center text-2xl text-japaneseIndigo">
                  <i className="icon-rs rs-black text-base mr-3"></i>6
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <i className="w-8 icon-email text-2xl mr-5"></i>
              <div className="w-full flex justify-between">
                <div className="">
                  <p className="text-base text-japaneseIndigo font-bold">Email</p>
                  <span className="text-sm text-gray-300 font-normal">
                    100 Email ID x 0.06
                  </span>
                </div>
                <div className="flex items-center text-2xl text-japaneseIndigo">
                  <i className="icon-rs rs-black text-base mr-3"></i>50.4
                </div>
              </div>
            </div>
            <span className="block border-b-2 border-dashed border-gray-300"></span>
            <div className="flex justify-between capitalize">
              <h1>total</h1>
              <h2>
                <i className="icon-rs rs-black text-lg"></i>26.4
              </h2>
            </div>
          </div>

          <div className="">
            <h3>Discount Coupon</h3>
            <div className="flex justify-between -mx-1">
              <div className="max-w-full w-full px-1 inputHolder pt-3 mr-3">
                <input
                  type="text"
                  className="input h-full"
                  placeholder="Enter Coupon Code"
                  required
                />
              </div>
              <div className="px-1 inputHolder pt-3">
                <button type="button" className="btn-primary whitespace-nowrap"  onClick={() => setIsNotificationDetailPreviewPopupOpen(true)}>
                  <h3>Apply Code</h3>
                </button>
              </div>
            </div>
          </div>
          <br />
          <button type="button" className="btn-primary w-full uppercase">
            <h3>Pay NOW</h3>
          </button>
          <div className="prw-next-btn mt-auto">
            <button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
            <button type="button" className="flex items-center active" onClick={clickNextHandler}><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
          </div>
        </div>
        <Modal isOpen={isNotificationDetailPreviewPopupOpen}>
        <NotificationCouponPopUp
          handleClose={setIsNotificationDetailPreviewPopupOpen}

        />
      </Modal>
      </div>
    </>
  );
}

export default NotificationMode;