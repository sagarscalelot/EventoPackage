import axios from 'axios';
import { event } from 'jquery';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { baseUrl, s3Url } from '../../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { imageType, onlyDigits,videoType } from '../../../shared/constants';

function EventPopUpAddEquipment({isItem, handleClose, data, setReload, edit}) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceType, setPriceType] = useState("per_day");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState(false);
  const [imageList, setImageList] = useState([]);
	const [videoList, setVideoList] = useState([]);
  const [error2, setError2] = useState(false);
  const eventId = localStorage.getItem("eventId");
	const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const params = useParams();
  const eventType = params.eventType;

  useEffect(()=> {
    if(data && edit) {
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setPriceType(data.price_type);
      setQuantity(data.quantity);
      setImage(data.photos[0].url)
      setVideo(data.videos[0].url)
    }
  },[handleClose, data, edit]);

  const token = localStorage.getItem("Token");
  const header = {
    'Authorization': `Token ${token}`,
  }
  const imageHeader = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'multipart/form-data'
  }
  const videoHeader = {
		'Authorization': `Token ${token}`,
		'Content-Type': 'multipart/form-data'
	}

  const photoChangeHandler = async(event) => {
		const size = 5;
		let selected = event.target.files[0];
		if(imageList.length >= 1)  {
			toast.info("Image Upload Limit Exceed.");
			return
		}
		try {
			if(selected && imageType.includes(selected.type)) {
				if(selected.size < (size*1024*1024)){
					try {
						const formDataImage = new FormData();
						formDataImage.append("file",selected);
						const response = await axios.post(`${baseUrl}/organizer/events/image`, formDataImage, {headers: imageHeader});
						if(response.data.IsSuccess) {
							toast.success(response.data.Message);
							console.log(response);
							setErrorMessage(null);
							setError(false);
							setImageList(current => [...current,{url : response.data.Data.url}]);
						} else {
							toast.error(response.data.Message);
						}
					} catch (error) {
						toast.error("Something Went Wrong.");
						console.log(error);
					}
				}
				else {
					// console.log("file size is greater than 3MB. File size is ", selected.size);
					setErrorMessage("file size is greater than "+size+" MB");
					setError(true);
				}
			} else {
				// console.log("please select valid image file. File type is ", selected.type);
				setErrorMessage("please select valid image file.");
				setError(true);
			}
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}   
  const videoChangeHandler = async(event) => {
		let selected = event.target.files[0];
		const size = 1024;
		if(videoList.length >= 1)  {
			toast.info("Video Upload Limit Exceed.");
			return
		}
		try {
			if(selected && videoType.includes(selected.type)) {
				if(selected.size < (size*1024*1024)) {
					try {
						const formDataVideo = new FormData();
						formDataVideo.append("file",selected)
						const response = await axios.post(`${baseUrl}/organizer/events/video`, formDataVideo, {headers: imageHeader});
						if(response.data.IsSuccess) {
							toast.success(response.data.Message);
							console.log(response);
							setErrorMessage(null);
						  	setError2(false);
							setVideoList(current => [...current,{url : response.data.Data.url}]);
						} else {
							toast.error(response.data.Message);
						}
					} catch (error) {
						toast.error("Something Went Wrong.");
						console.log(error);
					}
				}
				else {
					// console.log("file size is greater than 512MB. File size is ", selected.size);
					setErrorMessage("file size is greater than "+size+" Mb.");
					setError2(true);
				}
			} else {
				// console.log("please select video file with mp4 extension.",selected.type);
				setErrorMessage("please select valid video file.");
				setError2(true);
			}
		} catch (error) {
			console.log(error);
			setError2(true);
		}
	} 
  const requestObj = {
    eventid : eventId,
    name: name,
    price: price,
    price_type: priceType,
    description: description,
    quantity: quantity,
    photos: [],
    videos:[]
}
  const addServices = async() => {

    if(name.trim() === "" || price.trim() === "" || quantity.trim() === ""){
      toast.warn("Please fill all the reqired fields.");
      return
    }
    if(!(onlyDigits.test(price.trim()))) {
      toast.warn("Please enter valid Price.");
      return
    }
    if(!(onlyDigits.test(quantity.trim()))) {
      toast.warn("Please enter valid Qunatity.");
      return
    }
   
    try {
      const requestObj1 = {...requestObj, photos: imageList, videos: videoList, eventid: eventId};
      const res = await axios.post(`${baseUrl}/organizer/events/addequipment`, requestObj1, { headers: header });
      console.log("Equipment Added",res);
      setReload(current => !current);
      if(res.data.IsSuccess) {
        toast.success(res.data.Message);
        handleClose(false);
      } else {
        toast.error(res.data.Message);
      }
    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error);
    }
  }

  return (
	//   <!-- Add Service  -->
	  <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12">
            <div className="flex justify-between items-center">
              <h1 className="h1">Add Equipment</h1>
              <div className="flex items-center space-x-6">
                {/* <Link to="/" className="text-base font-bold text-spiroDiscoBall"><i className="icon-plus font-bold text-xs"></i> <span>Add Service</span></Link> */}
                <button onClick={()=>handleClose(false)} href="#" className="text-xl"><i className="icon-close"></i></button>
              </div>
            </div>
            <form className="space-y-5 py-8">
              <div className="w-full inputHolder">
                <label className="input-titel">Name <span>*</span></label>
                <input className="input option" type="text" value={name} onChange={(e) => setName(e.target.value) } />
                {/* <input className="input option" type="text" value="Catering" onChange={(e) => setName(e.target.value) }/> */}
              </div>
              <div className="w-full">
                <span className="input-titel">Price <span>*</span></span>
                <label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md">
                  <div className="w-full px-3.5">
                    <input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base" value={price} onChange={(e) => setPrice(e.target.value) } />
                  </div>
                  <div className="selectPrice flex items-center space-x-3">
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perDay" className="hidden" checked={priceType === "per_day" && true} onChange={(e)=> setPriceType("per_day")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        Per / Day
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perHour" className="hidden" checked={priceType === "per_person" && true} onChange={(e)=> setPriceType("per_person")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        Per / Person
                      </span>
                    </label>
                    <label className="block cursor-pointer">
                      <input type="radio" name="price" value="perEvent" className="hidden" checked={priceType === "per_event" && true} onChange={(e)=> setPriceType("per_event")} />
                      <span className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
                        Per / Event
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <div className="w-full inputHolder">
                <label className="input-titel">Add Quantity <span>*</span></label>
                <input className="input option" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value) } />
              </div>
              <div className="upload-holder">
                {/* <h6 className="text-sm font-bold text-quicksilver">Select Photo <span className="text-10">2 images (up to 3MB/Image)</span></h6> */}
                <h6 className="text-sm font-bold text-quicksilver">Select Photo <span className="text-10">2 images (up to 3MB)</span></h6>
                <label htmlFor="upload" className="upload upload-popup">
                  <input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
                  <span className="input-titel mt-1"><i className="icon-image mr-2"></i>Choose Images</span>
                </label>
                {error ? <span className="mt-1" style={{color: "red", fontSize: "14px"}}>{errorMessage} </span> : <span className="mt-1" style={{fontSize: "14px"}}>{image?.name || (image && <a target="blank" href={s3Url+"/"+image}>image link</a>)}</span>}
              </div>
              <div className="upload-holder">
                <h6 className="text-sm font-bold text-quicksilver">Select Video <span className="text-10">1 video (up to 3MB)</span></h6>
                <label htmlfor="upload" className="upload upload-popup">
                  <input type="file" name="images" id="upload2" className="appearance-none hidden" onChange={videoChangeHandler} />
                  <span className="input-titel mt-1"><i className="icon-video-play text-base mr-2"></i>Choose Video</span>
                </label>
                {error2 ? <span className="mt-1" style={{color: "red", fontSize: "14px"}}>{errorMessage2} </span> : <span className="mt-1" style={{fontSize: "14px"}}>{video?.name || (video && <a target="blank" href={s3Url+"/"+video}>video link</a>)}</span>}
              </div>
              <div className="w-full">
                <span className="input-titel">Description</span>
                <textarea name="" id="" cols="30" rows="5" className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md" value={description} onChange={(e) => setDescription(e.target.value) }></textarea>
              </div>
            </form>
            <div className="btn-primary w-full uppercase" onClick={addServices}>Submit</div>
            {/* <Link to="/" className="btn-primary w-full uppercase" onClick={addServices}>Submit</Link> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventPopUpAddEquipment