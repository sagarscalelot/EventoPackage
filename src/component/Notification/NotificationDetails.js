import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../config";
import { CKEditor } from '@ckeditor/ckeditor5-react'; 
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../modal/Modal";
import { toast } from 'react-toastify';
import NotificationDetailsPreviewPopup from "./popups/NotificationDetailsPreviewPopup";
import { param } from "jquery";

function NotificationDetails() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("Token");
  const [banner, setBanner] = useState("");
  const notificationId = localStorage.getItem("notificationId");
  const [isNotificationDetailPreviewPopupOpen, setIsNotificationDetailPreviewPopupOpen] = useState(false);

  const header = {
    'Authorization': `Token ${token}`
  }
  const imageHeader = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'multipart/form-data'
  }
  const handelcreatNotification = async () => {
    try {
      const requestObj = {
        notificationid: notificationId,
        notification_title: title,
        link: link,
        description: description,
        banner: banner
      }
      const response = await axios.post(`${baseUrl}/organizer/notification/save`, requestObj, { headers: header });
      if (response.data.IsSuccess) {
        navigate(-1);
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  }


  const photoChangeHandler = (event) => {
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    let selected = event.target.files[0];
    console.log("selected", selected);
    try {
      if (selected && types.includes(selected.type)) {
        if (selected.size < (3 * 1024 * 1024)) {
          setBanner(selected);
          addBanner(selected)
        }
        else {
          toast.warn("file size is greater than 3MB");
        }
      } else {
        toast.warn("please select image file with jpeg/png.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Selecting Image.");
    }
  }

  const addBanner = async (selected) => {
    const formData = new FormData();
    formData.append("file", selected);
    try {
      const response = await axios.post(`${baseUrl}/organizer/events/banner`, formData, { headers: imageHeader });
      if (response.data.IsSuccess) {
        setBanner(response.data.Data.url);
        console.log(response)
        toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong.");
    }
  }

  return (
    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <Link to="../notification" className="flex items-center">
            <i className="icon-back-arrow mr-4 text-2xl"></i>
            <h1>Create New Notification</h1>
          </Link>
        </div>
        {/* <!-- main-content  --> */}
        <div className="space-y-5">
          <div className="w-full flex items-end flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 inputHolder">
              <span className="input-titel text-lg text-japaneseIndigo font-bold">
                {" "}
                Notification Title
              </span>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 inputHolder">
              <span className="input-titel text-lg text-japaneseIndigo font-bold">
                Link
              </span>
              <input
                type="text"
                className="input"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
          <div className="upload-holder">
            <h3>
              {" "}
              <span className="flex items-end">Photo</span>
            </h3>
            <label htmlFor="upload2" className="upload">
              <input
                type="file"
                name="images"
                id="upload2"
                className="appearance-none hidden"
                onChange={photoChangeHandler}
              />
              <div className="mt-1 flex items-baseline justify-center">
                <i className="icon-image text-base mr-2"></i>
                <span className="input-titel pt-1">Upload Images</span>
              </div>
            </label>
            <span className="input-titel ml-2">{banner ? (banner.name || banner) : "Please select Images"}</span>
          </div>
          <div className="w-full space-y-2.5">
            <h3>Description</h3>
            <CKEditor
                    editor={ ClassicEditor }
                    onChange={ ( event, editor ) => {
                        setDescription((editor.getData()));
                    } }
                />
            {/* <div className="w-full bg-white rounded">
              <div className="p-8 w-full border-b-2 border-brightGray flex items-center space-x-6">
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-bold"></i>
                  </button>
                  <button type="button">
                    <i className="icon-capitals"></i>
                  </button>
                  <button type="button">
                    <i className="icon-underline"></i>
                  </button>
                  <button type="button">
                    <i className="icon-italic"></i>
                  </button>
                </div>
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-left-alignment"></i>
                  </button>
                  <button type="button">
                    <i className="icon-center-alignment"></i>
                  </button>
                  <button type="button">
                    <i className="icon-left-alignment-"></i>
                  </button>
                </div>
                <div className="flex space-x-2.5">
                  <button type="button">
                    <i className="icon-list-alpha text-xl"></i>
                  </button>
                  <button type="button">
                    <i className="icon-list text-xl"></i>
                  </button>
                  <button type="button">
                    <i className="icon-list-num text-xl"></i>
                  </button>
                </div>
              </div>
              <textarea
                cols="30"
                rows="5"
                className="w-full outline-none p-7 py-5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div> */}
          </div>
          <div className="text-right">
            <button
              className="btn-primary"
              onClick={() => setIsNotificationDetailPreviewPopupOpen(true)}
            >
              preview
            </button>
          </div>
          {/* <BottomNavigation /> */}
          <div className="prw-next-btn mt-auto">
            <button type="button" className="flex items-center">
              <i className="icon-back-arrow mr-3"></i>
              <h3>Back</h3>
            </button>
            <button
              className="btn-primary"
              onClick={handelcreatNotification}
            >
              Done
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isNotificationDetailPreviewPopupOpen}>
        <NotificationDetailsPreviewPopup
          handleClose={setIsNotificationDetailPreviewPopupOpen}
          notification_title={title} link={link} banner={banner} description={description}
        />
      </Modal>
    </div>
  );
}

export default NotificationDetails;
