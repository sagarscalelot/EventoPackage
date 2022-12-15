import React from "react";
import cardImage1 from "../../assest/svg/have-you-places.svg";
import cardImage2 from "../../assest/svg/personal-skills-business.svg";
import cardImage3 from "../../assest/svg/group-skils-business.svg";
import cardImage4 from "../../assest/svg/all-user.svg";
import cardImage5 from "../../assest/svg/existing-user.svg";
import SelectBusinessCard from "./SelectBusinessCard";
import { decrement, increment } from '../../redux/stepProgressCount'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Advertisement from "../Advertisement";
import StepProgressBar from "../events/StepProgressBar";

function SelectBusiness() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const eventType = params.eventType;

  const clickBackHander = () => {
    dispatch(decrement());
    navigate(-1);
  }
  return (
    <div className="wrapper min-h-full">
      {/* <!-- title-holder  -->/ */}
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={clickBackHander}><i className="icon-back-arrow mr-4 text-2xl"></i>
          <h1>Promot</h1>
        </div>
      </div>

      {/* <!-- step-progress-bar  --> */}
      <div className="w-full overflow-hidden">
        <StepProgressBar eventType={eventType} />
      </div>

      <div className="">
        <h3>Select Business</h3>
        <div className="flex flex-wrap justify-center pt-4 -mx-4">
          {/* Have you Places */}
          <Link to="nhyp" className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group">
            <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
              <div className="w-32 h-32">
                <img
                  src={cardImage1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap">
                Have you Places?
              </p>
            </div>
          </Link >
          {/* Personal Skills Business */}
          <Link to="npsb" className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group">
            <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
              <div className="w-32 h-32">
                <img
                  src={cardImage2}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap">
                Personal Skills Business
              </p>
            </div>
          </Link >
          {/* Group Skils Business */}
          <Link to="ngsb" className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group">
            <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
              <div className="w-32 h-32">
                <img
                  src={cardImage3}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap">
                Group Skils Business
              </p>
            </div>
          </Link >
          {/* All User */}
          <Link to="nalluser" className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group">
            <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
              <div className="w-32 h-32">
                <img
                  src={cardImage4}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap">
                All User
              </p>
            </div>
          </Link >
          {/* Existing User */}
          <Link to="nexistinguser" className="w-1/2 lg:w-1/3 xl:w-1/5 px-2 xl:px-2.5 pb-4 xl:pb-0 group">
            <div className="text-center bg-white rounded flex flex-col justify-between items-center h-full px-5 py-7 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
              <div className="w-32 h-32">
                <img
                  src={cardImage5}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-base font-bold group-hover:text-spiroDiscoBall pt-8 whitespace-nowrap">
                Existing User
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Advertisement */}
      <div className="mt-auto">
        <Advertisement />
      </div>
    </div>
  );
}

export default SelectBusiness;
