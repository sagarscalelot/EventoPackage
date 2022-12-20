import React from 'react';
import { useSelector } from 'react-redux';

function StepProgressBar() {

    const notificationProgressBarList = ["Select Business", "User", "Publish Date & Time", "Notification Mode", "Payment"];

    const count = useSelector(state => state.StepProgressCount.count);

    return (
        <div className="w-full overflow-hidden">
            <ul className="flex justify-between step-progress-holder">
                {notificationProgressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StepProgressBar