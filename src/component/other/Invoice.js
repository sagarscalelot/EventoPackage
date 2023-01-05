import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config';
import { MoonLoader } from 'react-spinners';
import InvoicePaggination from './InvoicePaggination';

function Invoice() {
	const navigate = useNavigate();
	const [invoice, setiIvoice] = useState([]);
	const token = localStorage.getItem("Token");
	const [loading, setLoading] = useState(true);
	const [pageNo, setPageNo] = useState(1);
	const limit = 7;
	const header = {
		'Authorization': `Token ${token}`
	}
	const invoiceList = async () => {
		const requestObj = {
			page: pageNo,
			limit: limit,
		}
		try {
			const response = await axios.post(`${baseUrl}/organizer/invoice/list`, requestObj, { headers: header });
			console.log(response.data.Data);
			setiIvoice(response.data.Data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	// const handelerInviceDetails = (e) => {
	//     navigate("invoicedetials")
	// }

	useEffect(() => {
		invoiceList();
	}, [pageNo])


	return (
		<div className="wrapper min-h-full">

			<div className="space-y-8 h-full">
				{/* <!-- title-holder  --> */}
				<div className="flex justify-between items-center">
					<h1>Invoice</h1>
					<button type="button" className="btn-primary text-base" onClick={() => navigate("invoice-history")}>History</button>
				</div>
				{/* <!-- main-content  --> */}
				<div className="space-y-2.5">
					<MoonLoader
						cssOverride={{ margin: "100px auto" }}
						color={"#20c0E8"}
						loading={loading}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					{invoice.docs?.map((e) => (
						<>
							<div key={e?._id} e={e} className="w-full bg-white flex justify-between p-6 rounded-lg cursor-pointer" onClick={() => { localStorage.setItem('invoiceId', e?._id); navigate("invoicedetials") }}>
								<div className="flex items-center space-x-6">
									<p className="h2"># 96935</p>
									<p className="h2 font-medium text-quicksilver">{e?.name}</p>
									<p className="h2 font-medium text-quicksilver">{e?.userid?.name}</p>
								</div>
								<div className="flex items-center space-x-6">
									<div className="flex items-center space-x-6">
										{/* <p className="h2">100 Qty</p> */}
										<p className="h2">₹{e?.totalPrice}</p>
									</div>
									<button className="">
										<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M26.5 19C26.1685 19 25.8505 19.1317 25.6161 19.3661C25.3817 19.6005 25.25 19.9185 25.25 20.25V25.25H2.75V20.25C2.75 19.9185 2.6183 19.6005 2.38388 19.3661C2.14946 19.1317 1.83152 19 1.5 19C1.16848 19 0.850537 19.1317 0.616116 19.3661C0.381696 19.6005 0.25 19.9185 0.25 20.25V26.5C0.25 26.8315 0.381696 27.1495 0.616116 27.3839C0.850537 27.6183 1.16848 27.75 1.5 27.75H26.5C26.8315 27.75 27.1495 27.6183 27.3839 27.3839C27.6183 27.1495 27.75 26.8315 27.75 26.5V20.25C27.75 19.9185 27.6183 19.6005 27.3839 19.3661C27.1495 19.1317 26.8315 19 26.5 19Z" fill="#20C0E8" />
											<path d="M13.116 21.1338C13.3504 21.3681 13.6683 21.4997 13.9998 21.4997C14.3312 21.4997 14.6491 21.3681 14.8835 21.1338L22.3835 13.6337C22.6112 13.398 22.7372 13.0822 22.7344 12.7545C22.7315 12.4268 22.6001 12.1132 22.3683 11.8815C22.1365 11.6497 21.823 11.5183 21.4953 11.5154C21.1675 11.5126 20.8518 11.6386 20.616 11.8663L15.2498 17.2325V1.5C15.2498 1.16848 15.1181 0.850537 14.8837 0.616116C14.6492 0.381696 14.3313 0.25 13.9998 0.25C13.6683 0.25 13.3503 0.381696 13.1159 0.616116C12.8815 0.850537 12.7498 1.16848 12.7498 1.5V17.2325L7.38353 11.8663C7.14777 11.6386 6.83202 11.5126 6.50428 11.5154C6.17653 11.5183 5.86301 11.6497 5.63125 11.8815C5.39949 12.1132 5.26803 12.4268 5.26518 12.7545C5.26234 13.0822 5.38833 13.398 5.61603 13.6337L13.116 21.1338Z" fill="#20C0E8" />
										</svg>
									</button>
								</div>
							</div>
						</>
					))}
					{!loading && ((invoice?.totalPages > 0) ? <InvoicePaggination invoice={invoice} limit={limit} setPageNo={setPageNo} pageNo={pageNo} /> : <h1 style={{ margin: "100px 0" }}>No Invoice Found</h1>)}
				</div>
			</div>
		</div>
	)
}

export default Invoice;
