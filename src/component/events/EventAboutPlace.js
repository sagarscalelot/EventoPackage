import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import Advertisement from "../Advertisement";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../config';
import StepProgressBar from './StepProgressBar';
import { decrement, increment } from '../../redux/stepProgressCount';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EventAboutPlace() {
	const displayName = localStorage.getItem("displayName");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const [banner, setBanner] = useState("");
	const [priceType, setPriceType] = useState("per_day");
	const [about, setAbout] = useState("");
	const eventId = localStorage.getItem("eventId");
	const eventType = params.eventType;
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}
	const imageHeader = {
		'Authorization': `Token ${token}`,
		'Content-Type': 'multipart/form-data'
	}

	const ValidationSchema = Yup.object().shape({
		place_price: Yup.number().typeError('Price must be a digit').integer().positive("Price must be positive").required("Price is required")
	});

	const initialState = {
		place_price: "",
	}

	const clickNextHandler = async (values) => {
		const requestObj = {
			...values,
			eventid: eventId,
			price_type: priceType,
			details: about,
			banner: banner
		}
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/aboutplace`, requestObj, { headers: header });
			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				dispatch(increment());
				navigate("../personaldetails");
			} else {
				toast.error(response.data.Message);
			}


		} catch (error) {
			console.log(error);
			toast.error("Something Went Wrong.");
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
				// toast.success(response.data.Message);
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
					addBanner(selected);
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

	const clickBackHander = () => {
		dispatch(decrement());
		navigate(-1);
	}
	const formik = useFormik({
		initialValues: initialState,
		validationSchema: ValidationSchema,
		onSubmit: clickNextHandler,
	});

	const getAboutPlace = async () => {
		try {
			const response = await axios.get(`${baseUrl}/organizer/events/aboutplace?eventid=${eventId}`, { headers: header });
			if (response.data.Data.aboutplace) {
				setAbout(response.data.Data.aboutplace.details);
				formik.setValues(response.data.Data.aboutplace);
				setPriceType(response.data.Data.aboutplace.price_type);
				setBanner(response.data.Data.aboutplace.banner);
			}
			if (!response.data.IsSuccess) {
				toast.error("Error occured while fetching data.")
			}
		} catch (error) {
			console.log(error);
		}
	}

	// const perDay = () => {
	// 	if (priceType === "per_day" && true) {

	// 	}
	// }

	useEffect(() => {
		getAboutPlace();
	}, []);

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);

	return (
		//  <!-- Content In -->
		<form onSubmit={formik.handleSubmit}>
			<div className="wrapper min-h-full flex flex-col">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  -->/ */}
					<div className="flex justify-between items-center">
						<div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i>
							<h1>{displayName}</h1>
						</div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					{/* <!-- main-content  --> */}
					<div className="space-y-3">
						<div className="upload-holder">
							<span className="input-titel ml-2">Place Banner</span>
							<label htmlFor="upload" className="upload">
								<input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
								<span className="input-titel mt-1"><i className="icon-image mr-2"></i>Upload Images</span>
							</label>
							<span className="input-titel ml-2">{banner ? (banner.name || banner) : "Please select Images"}</span>
						</div>
						{/* <div className="w-full">
							<span className="input-titel">Price</span>
							<label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md">
								<div className="w-full px-3.5">
									<input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base"
										value={formik.values?.place_price} name="place_price" onChange={(e) => setInputValue("place_price", e.target.value)} />
								</div>
								<div className="selectPrice flex items-center space-x-3">
									<label className="block cursor-pointer">
										<input type="radio" name="price" value="per_day" defaultChecked className="hidden" onChange={(e) => setPriceType("per_day")} />
										<span
											className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
											Per / Day
										</span>
									</label>
									<label className="block cursor-pointer">
										<input type="radio" name="price" value="per_hour" className="hidden" checked={priceType === "per_hour" && true} onChange={(e) => setPriceType("per_hour")} />
										<span
											className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
											Per / Hour
										</span>
									</label>
									<label className="block cursor-pointer">
										<input type="radio" name="price" value="per_event" className="hidden" checked={priceType === "per_event" && true} onChange={(e) => setPriceType("per_event")} />
										<span
											className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
											Per / Event
										</span>
									</label>
								</div>
							</label>
						</div> */}

						{/* option 1 */}
						<div className="flex items-center space-x-3">
							<div className={"inputHolder " + (priceType === "per_day" && true ? 'w-8/12' : 'w-8/12')}>
								<span className="input-titel">Price<span>*</span></span>
								<label htmlFor="" className="flex items-center w-full bg-white p-2 px-3.5 rounded-md">
									<div className="w-full inputHolder">
										<input type="text" className="w-full outline-none text-spiroDiscoBall font-bold text-base"
											value={formik.values?.place_price} name="place_price" onChange={(e) => setInputValue("place_price", e.target.value)} />
									</div>
									<div className="selectPrice flex items-center space-x-3">
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_day" defaultChecked className="hidden" onChange={(e) => setPriceType("per_day")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												Per / Day
											</span>
										</label>
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_hour" className="hidden" checked={priceType === "per_hour" && true} onChange={(e) => setPriceType("per_hour")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												Per / Hour
											</span>
										</label>
										<label className="block cursor-pointer">
											<input type="radio" name="price" value="per_event" className="hidden" checked={priceType === "per_event" && true} onChange={(e) => setPriceType("per_event")} />
											<span
												className="text-sm text-quicksilver py-2 px-3 bg-white shadow-lg whitespace-nowrap font-bold rounded block">
												Per / Event
											</span>
										</label>
									</div>
								</label>
							</div>

							<div className={"inputHolder " + (priceType === "per_hour" ? 'w-4/12' : (priceType === "per_event" ? 'w-2/12' : (priceType === "per_day" ? 'w-4/12' : 'hidden')))}>
								<label className="input-titel">Clearing Time <span>*</span></label>
								<input type="time" className="input py-[14px]" name='clearning time' />
							</div>
							<div className={"inputHolder " + (priceType === "per_event" ? 'w-2/12' : 'hidden')}>
								<label className="input-titel">Max Day<span>*</span></label>
								<input type="number" className="input py-[14px]" name='max day price' />
							</div>
						</div>

						<small className="text-red-500 text-xs">{formik.errors.place_price}</small>
						<div className="w-full">
							<span className="input-titel">About place</span>
							<textarea name="" id="" cols="30" rows="5" value={about}
								className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md" onChange={(e) => setAbout(e.target.value)}></textarea>
						</div>
					</div>
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
				</div>
				<div className="prw-next-btn mt-auto">
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
					<button type="submit" className="flex items-center active" ><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</div>
		</form>
	)
}

export default EventAboutPlace