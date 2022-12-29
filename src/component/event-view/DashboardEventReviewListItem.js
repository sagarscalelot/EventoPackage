import React from 'react'
import { s3Url } from '../../config';
import preview from '../../assest/images/landing-page/user-i.png'

function DashboardEventReviewListItem({ data }) {

// console.log("Review Data list",data);
    const Star = ({ratings}) => {
        const numberRating = Number(ratings);
        console.log("numberRating",numberRating);
      const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return (
          <span key={index}>
            {numberRating >= index + 1 ? (
              <i className="icon-fillStar text-sm"></i>
            ) : numberRating >= number ? (
              <i className="icon-half-star text-sm"></i>
            ) : (
              <i className="icon-star text-sm"></i>
            )}
          </span>
        );
      });
         return (
            <div>{ratingStar}</div>
         )
     };
    
    return (
        <div className="flex justify-between">
            <div className="">
                <div className="w-28 h-28 border-2 border-brightGray rounded-full overflow-hidden bg-white">
                    <img src={data?.userid.profile_pic && data?.userid.profile_pic !=="" ? s3Url+data?.userid.profile_pic : preview } alt="cutting-board" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-full pl-5">
                <div className="flex justify-between">
                    <h3>{data?.userid.name}</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-quicksilver">19 Jan, 2022</span>
                        <div className="flex items-center text-xs space-x-0.5">
                        <Star ratings={data?.ratings}/>
                        </div>
                    </div>
                </div>
                <p className="text-japaneseIndigo text-sm font-normal leading-6 pt-2">{data?.review}</p>
            </div>
        </div>
    )
}

export default DashboardEventReviewListItem;
