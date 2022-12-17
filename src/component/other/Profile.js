import axios from 'axios';
import React from 'react'
import Advertisement from '../Advertisement';
import PersonalProfile from './PersonalProfile';
import BusinessProfile from './BusinessProfile';
import {baseUrl} from "../../config";
import { useEffect } from 'react';
import { useState } from 'react';

function Profile() {


    return (
        <div className="wrapper min-h-full flex flex-col">
            <div className="space-y-8 h-full">
                {/* <!-- advisement --> */}
                {/* <!-- profile 1 --> */}
                <PersonalProfile  />
                <Advertisement />
                
                {/* <!-- profile 2 --> */}
                <BusinessProfile />
            </div>
        </div>
    )
}

export default Profile;
