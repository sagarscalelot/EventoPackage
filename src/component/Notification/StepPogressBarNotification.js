import React from 'react'
import { useSelector } from 'react-redux'

function StepPogressBarNotification({ notificationType }) {
    const notificationhypPogressBarList = ["Select Business", "User", "publish date & time", "Notification Mode", " Payment"];

    const notificationpsbPogressBarList = ["Select Business", "User", "publish date & time", "Notification Mode", " Payment"];

    const notificationgsbPogressBarList = ["Select Business", "User", "publish date & time", "Notification Mode", " Payment"];

    const notificationalluserPogressBarList = ["Select Business", "User", "publish date & time", "Notification Mode", " Payment"];

    const notificationexistinguserPogressBarList = ["Select Business", "User", "publish date & time", "Notification Mode", " Payment"];

    const count = useSelector(state => state.StepProgressCount.count);
    return (
        <div className="w-full overflow-hidden">
            <ul className="flex justify-between step-progress-holder">
                {/* notification flow StepBar */}
                {notificationType === "nhyb" && notificationhypPogressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
                {notificationType === "npsb" && notificationpsbPogressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
                {notificationType === "ngsb" && notificationgsbPogressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
                {notificationType === "nalluser" && notificationalluserPogressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
                {notificationType === "nexistinguser" && notificationexistinguserPogressBarList.map((element, index) => (
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

export default StepPogressBarNotification