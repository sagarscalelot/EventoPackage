import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../config";
import axios from "axios";

function NotificationCouponPopUp({ handleClose }) {
  const [coupon, setCoupon] = useState("");

  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Token ${token}`,
  };

  const getCoupomList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/organizer/notificationcoupons/list`,
        { headers: header }
      );

      setCoupon(response.data.Data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupomList();
  }, []);

  return (
    <>
      <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
        <div className="table-cell align-middle">
          <div className="wrapper popin w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto">
            <div className="bg-brightGray p-7 space-y-7">
              <div className="flex justify-between items-center">
                <h1 className="h1">Discount Coupon</h1>
                <div className="flex items-center space-x-6 cursor-pointer">
                  <i
                    className="icon-close"
                    onClick={() => handleClose(false)}
                  ></i>
                </div>
              </div>

              <div className="bg-white p-[30px] rounded-md">
                <div className="flex w-full justify-between items-center">
                  <div className="w-full">
                    <div className="flex justify-between items-center pl-4">
                      <h2 className="text-2xl font-bold">{coupon.title}</h2>
                      <button
                        type="button"
                        className="btn-primary whitespace-nowrap uppercase"
                      >
                        Apply
                      </button>
                    </div>
                    <span class="block border-b-2 border-dashed border-gray-300 my-5"></span>
                    <p className="text-gray-400 text-sm pt-3 font-medium pl-4">
                      {coupon.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* <NotificationLIstItem data={requestObj} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationCouponPopUp;
