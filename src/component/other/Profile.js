import axios from 'axios';
import React from 'react'
// import Advertisement from '../Advertisement';
import PersonalProfile from './PersonalProfile';
import BusinessProfile from './BusinessProfile';
import { baseUrl } from "../../config";
import { useEffect } from 'react';
import { useState } from 'react';

function Profile() {
    const token = localStorage.getItem("Token");
    const [details, setDetails] = useState({});
    const [business, setBusiness] = useState({})

    const header = {
        'Authorization': `Token ${token}`,
    }

    const getProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/organizer/profile`, { headers: header });
            console.log("response.data.Data", response.data.Data);
            setDetails(response.data.Data)
            setBusiness(response.data.Data.businessProfile)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="wrapper min-h-full flex flex-col">
            <div className="space-y-8 h-full">
                {/* <!-- advisement --> */}
                {/* <!-- profile 1 --> */}
                <PersonalProfile  token={token} details={details} />
                {/* <Advertisement /> */}

                {/* <!-- profile 2 --> */}
                <BusinessProfile  token={token} business={business} />
            </div>
        </div>
    )
}

export default Profile;
