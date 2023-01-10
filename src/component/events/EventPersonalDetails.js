import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Advertisement from '../Advertisement';
import StepProgressBar from './StepProgressBar';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/stepProgressCount';
import { baseUrl } from '../../config';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


function EventPersonalDetails() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const eventType = params.eventType;
	const eventId = localStorage.getItem("eventId");
	const displayName = localStorage.getItem("displayName");
	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Token ${token}`
	}
	const ValidationSchema = Yup.object().shape({
		professional_skill: Yup.string(),
		full_name: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Full name is required*'),
		country_code: Yup.string().required('Country Code is required*'),
		mobile: Yup.number().typeError('Contact number must be a digit').integer().positive("Contact number must be positive").required("Contact number is required"),
		alt_mobile_no: Yup.number().typeError('Contact number must be a digit').integer().positive("Contact number must be positive"),
		email: Yup.string().email('Invalid email format').required('Email address is required*'),
		flat_no: Yup.string(),
		street: Yup.string(),
		area: Yup.string(),
		city: Yup.string().required('City name is required*'),
		state: Yup.string().required('State name is required*'),
		pincode: Yup.string().min(6, 'Too Short!').max(6, 'Too Long!').required('Pincode is required*')
	});
	const initialState = {
		professional_skill: "",
		full_name: "",
		country_code: "",
		mobile: "",
		alt_mobile_no: "",
		email: "",
		flat_no: "",
		street: "",
		area: "",
		city: "",
		state: "",
		pincode: "",
	}
	const [mobileNoHidden, setMobileNoHidden] = useState(false);
	const [emailHidden, setEmailHidden] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [count, setCount] = useState(false);

	const clickNextHandler = async (values) => {

		const requestObj = { ...values, is_mobile_no_hidden: mobileNoHidden, is_email_hidden: emailHidden, eventid: eventId };

		console.log("values >> ", requestObj);
		try {
			const response = await axios.post(`${baseUrl}/organizer/events/personaldetail`, requestObj, { headers: header });
			console.log("Personal details > ", response);
			console.log("requestObj",  requestObj);
			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				dispatch(increment());
				navigate(`../photosandvideos`);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			toast.error("Something Went Wrong.");
			navigate(`/auth/login`);
			console.log(error);
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

	const getProfile = async () => {

		try {
			const response = await axios.get(`${baseUrl}/organizer/profile`, { headers: header });
			console.log("Personal Default Data", response.data.Data);
			formik.values.full_name = response.data.Data.name
			formik.values.mobile = response.data.Data.mobile;
			formik.values.email = response.data.Data.email;
			formik.values.country_code = response.data.Data.country_code;
			console.log(">>>>>>>>>>>>>>>>>>>>>", response.data.Data.country_code);
			// setCode(code);
		} catch (error) {
			console.log(error);
			// navigate(`/auth/login`);
		}
		setCount(true)
	}

	const getPersonalDetails = async () => {
		try {

			const response = await axios.get(`${baseUrl}/organizer/events/personaldetail?eventid=${eventId}`, { headers: header });
			if (response.data.Data.personaldetail) {
				formik.setValues(response.data.Data.personaldetail);
			}
			if (!response.data.IsSuccess) {
				toast.error("Error occured while fetching data.");
			}
		} catch (error) {
			console.log(error);
		}
		// formik.values.full_name = nam
	};

	// useEffect(() => {
	// 	// getProfile();
	// 	getPersonalDetails();
	// }, []);
	useEffect(() => {
		getProfile();
		getPersonalDetails();
	}, [count]);

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);
	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="wrapper min-h-full">
				<div className="space-y-8 h-full">
					{/* <!-- title-holder  --> */}
					<div className="flex justify-between items-center">
						<div className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl" onClick={clickBackHander}></i><h1>{displayName}</h1></div>
					</div>
					{/* <!-- step-progress-bar  --> */}
					<StepProgressBar eventType={eventType} />
					{/* <!-- main-content  --> */}
					<div className="space-y-5 -mx-2">
						<div className="w-full flex items-end flex-wrap">
							<div className="w-full md:w-1/2 px-2 inputHolder">
								<span className="input-titel">Professional Skill</span>
								<input type="text" className="input" name="professional_skill" value={formik.values?.professional_skill} onChange={(e) => setInputValue("professional_skill", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.professional_skill}</small>
								<br />
							</div>
							<div className="w-full md:w-1/2 px-2 inputHolder">
								<span className="input-titel">Full Name (Mr / Mrs / Ms) <span>*</span></span>
								<input type="text" className="input" name="full_name" value={formik.values?.full_name}   />
								<small className="text-red-500 text-xs">{formik.errors.full_name}</small>
								<br />
							</div>
						</div>
						<div className="w-full flex items-end flex-wrap">
							<div className="w-full md:w-1/3 px-2 inputHolder">
								<div className="input-label-holder">
									<label className="input-titel">Mobile Number <span>*</span></label>
									<div className="input-checkd"><input type="checkbox" className="mr-2" name="is_mobile_hidden" onChange={() => setMobileNoHidden(!mobileNoHidden)} />Hidden</div>
								</div>
								<div className="flex">
									<input type="text" className="input max-w-[80px] w-full mr-3" name="country-code" value={formik.values?.country_code}/>
									<input type="text" className="input" name="mobile" value={formik.values?.mobile} /></div>
								<small className="text-red-500 text-xs">{formik.errors.mobile}</small>
								<br />
							</div>
							<div className="w-full md:w-1/3 px-2 inputHolder">
								<label className="input-titel">Alternative Mobile Number <span></span></label>
								<input type="text" className="input" name='alt_mobile' value={formik.values?.alt_mobile} onChange={(e) => setInputValue("alt_mobile", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.alt_mobile}</small>
								<br />
							</div>
							<div className="w-full md:w-1/3 px-2 inputHolder">
								<div className="input-label-holder">
									<label className="input-titel">Email Address <span>*</span></label>
									<div className="input-checkd"><input type="checkbox" className="mr-2" onChange={() => setEmailHidden(!emailHidden)} />Hidden</div>
								</div>
								<input type="text" className="input" name='email' value={formik.values?.email}  />
								<small className="text-red-500 text-xs">{formik.errors.email}</small>
								<br />
							</div>
						</div>
						<div className="space-y-5">
							<h3 className="px-2">Address</h3>
							<div className="w-full flex flex-wrap">
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<span className="input-titel">Flat No.</span>
									<input type="text" className="input" name='flat_no' value={formik.values?.flat_no} onChange={(e) => setInputValue("flat_no", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.flat_no}</small>
									<br />
								</div>
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<span className="input-titel">Street Name.</span>
									<input type="text" className="input" name='street' value={formik.values?.street} onChange={(e) => setInputValue("street", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.street}</small>
									<br />
								</div>
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<span className="input-titel">Area Name.</span>
									<input type="text" className="input" name='area' value={formik.values?.area} onChange={(e) => setInputValue("area", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.area}</small>
									<br />
								</div>
							</div>
							<div className="w-full flex flex-wrap">
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<label className="input-titel">City <span>*</span></label>
									<input type="text" className="input" name='city' value={formik.values?.city} onChange={(e) => setInputValue("city", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.city}</small>
									<br />
								</div>
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<label className="input-titel">State <span>*</span></label>
									<input type="text" className="input" name='state' value={formik.values?.state} onChange={(e) => setInputValue("state", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.state}</small>
									<br />
								</div>
								<div className="w-full md:w-1/3 px-2 inputHolder">
									<label className="input-titel">Pincode <span>*</span></label>
									<input type="text" className="input" name='pincode' value={formik.values?.pincode} onChange={(e) => setInputValue("pincode", e.target.value)} />
									<small className="text-red-500 text-xs">{formik.errors.pincode}</small>
									<br />
								</div>
							</div>
						</div>
					</div>
					{/* <!-- advisement --> */}
					{/* <Advertisement /> */}
				</div>
				<div className="prw-next-btn">
					<button type="button" className="flex items-center" onClick={clickBackHander}><i className="icon-back-arrow mr-3"></i><h3>Back</h3></button>
					<button type="submit" className="flex items-center active" ><h3>Next</h3><i className="icon-next-arrow ml-3"></i></button>
				</div>
			</form>
		</div>
	)
}

export default EventPersonalDetails;
