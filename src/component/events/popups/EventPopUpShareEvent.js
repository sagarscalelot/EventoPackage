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
                        <div className="flex justify-between items-center">
                            <h1 className="h1">Share Event</h1>
                            <div className="flex items-center space-x-6">
                                <button onClick={() => handleClose(false)} href="#" className="text-xl"><i className="icon-close"></i></button>
                                <WhatsappShareButton url={url}>
                                    <WhatsappIcon size={size} round={true} />
                                </WhatsappShareButton>
                                <FacebookShareButton url={url}>
                                    <FacebookIcon size={size} round={true} />
                                </FacebookShareButton>
                                <TelegramShareButton url={url}>
                                    <TelegramIcon size={size} round={true} />
                                </TelegramShareButton>
                                <TwitterShareButton url={url}>
                                    <TwitterIcon size={size} round={true} />
                                </TwitterShareButton>
                                <EmailShareButton url={url}>
                                    <EmailIcon size={size} round={true} />
                                </EmailShareButton>
                                {/* <LinkedinShareButton url={url}>
                                    <LinkedinIcon size={size} round={true} />
                                </LinkedinShareButton>
                                <OKShareButton url={url}>       
                                    <OKIcon size={size} round={true} />
                                </OKShareButton>
                                <PinterestShareButton url={url}>
                                    <PinterestIcon size={size} round={true} />
                                </PinterestShareButton>
                                <RedditShareButton url={url}>
                                    <RedditIcon size={size} round={true} />
                                </RedditShareButton>
                                <TumblrShareButton url={url}>
                                    <TumblrIcon size={size} round={true} />
                                </TumblrShareButton>
                                <VKShareButton url={url}>
                                    <VKIcon size={size} round={true} />
                                </VKShareButton> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
