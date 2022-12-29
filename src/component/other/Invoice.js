import React from 'react'
import { useNavigate } from 'react-router-dom';
import Advertisement from "../Advertisement";
import InvoiceListItem from "./InvoiceListItem";

function Invoice() {
    const navigate = useNavigate();
    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <h1>Invoice</h1>
                    <button type="button" className="btn-primary text-base" onClick={() => navigate("/dashboard/invoice-history")}>History</button>
                </div>
                {/* <!-- main-content  --> */}
                <div className="space-y-2.5">
                    <div className="w-full bg-white flex justify-between p-6 rounded-lg">
                        <div className="flex items-center space-x-6">
                            <p className="h2"># 96935</p>
                            <p className="h2 font-medium text-quicksilver">Sweet Love Catering</p>
                            <p className="h2 font-medium text-quicksilver">Alexander wang</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <p className="h2">100 Qty</p>
                            <p className="h2">₹1,20,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice;
