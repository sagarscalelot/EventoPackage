import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../config';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    FacebookIcon,
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount,
    WhatsappIcon,
    EmailIcon,
    TelegramIcon,
    TwitterIcon,
    OKIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TumblrIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WorkplaceIcon
} from "react-share";

export default function EventPopUpShareEvent({ handleClose, url }) {
    const token = localStorage.getItem("Token");

    const header = {
        'Authorization': `Token ${token}`,
    }

    const [details, setDetails] = useState({});

    const getProfile = async () => {
        try {
            const response = await axios.get(`${baseUrl}/organizer/profile`, { headers: header });
            console.log("response.data.Data", response.data.Data.my_refer_code);
            setDetails(response.data.Data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getProfile();
    }, []);
    const size = 50;
    url = `Give 10 Coin, Get 10 Coin
    Refer Friends to allset and give them 10 coin with your referral code ${details.my_refer_code} once they order, you get 10 coin too. www.eventopackage.com`
    return (
        <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
            <div className="table-cell align-middle">
                <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
                    <div className="bg-brightGray p-12">
                        <div className="space-y-10">
                            <div className="flex justify-between">
                                <h1 className="h1">Share Event</h1>
                                <button onClick={() => handleClose(false)} href="#" className="text-xl"><i className="icon-close"></i></button>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-2/12 mb-5">
                                    <WhatsappShareButton url={url}>
                                        <WhatsappIcon size={size} round={true} />
                                    </WhatsappShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <FacebookShareButton url={url}>
                                        <FacebookIcon size={size} round={true} />
                                    </FacebookShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <TelegramShareButton url={url}>
                                        <TelegramIcon size={size} round={true} />
                                    </TelegramShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <TwitterShareButton url={url}>
                                        <TwitterIcon size={size} round={true} />
                                    </TwitterShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <EmailShareButton url={url}>
                                        <EmailIcon size={size} round={true} />
                                    </EmailShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <LinkedinShareButton url={url}>
                                        <LinkedinIcon size={size} round={true} />
                                    </LinkedinShareButton>
                                </div>
                                {/* <div className="w-2/12 mb-5">
                                    <OKShareButton url={url}>
                                        <OKIcon size={size} round={true} />
                                    </OKShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <PinterestShareButton url={url}>
                                        <PinterestIcon size={size} round={true} />
                                    </PinterestShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <RedditShareButton url={url}>
                                        <RedditIcon size={size} round={true} />
                                    </RedditShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <TumblrShareButton url={url}>
                                        <TumblrIcon size={size} round={true} />
                                    </TumblrShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <VKShareButton url={url}>
                                        <VKIcon size={size} round={true} />
                                    </VKShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <InstapaperShareButton url={url}>
                                        <InstapaperIcon size={size} round={true} />
                                    </InstapaperShareButton>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
