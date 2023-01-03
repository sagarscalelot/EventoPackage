import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function InvoiceDetials({ e }) {
    console.log(e);
    const navigate = useNavigate();

    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <div onClick={() => navigate("../../invoice")} className="flex items-center cursor-pointer"><i className="icon-back-arrow mr-4 text-2xl"></i><h1>Invoice Details</h1></div>
                    <a href="#" className="btn-primary small group">Download Invoice</a>
                </div>
                {/* <!-- main-content  --> */}
                <div className="p-8 rounded-md bg-white">
                    <div className="w-full flex items-center pb-9 border-b border-brightGray">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                            {/* <img src="assest/images/user-2.png" className="w-full object-cover" alt="Invoice_Details_profile"> */}
                        </div>
                        <div className="text-left pl-4">
                            <span className="block text-base font-bold">Name</span>
                            <span className="block text-sm font-normal text-quicksilver">Mark Jecno</span>
                        </div>
                    </div>
                    <div className="pt-8 w-full space-y-5 xl:space-y-6">
                        <div className="text-left">
                            <span className="block text-base font-bold">Event Name</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">1548923654598236</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-base font-bold">invoice Number</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">{e?.name}</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-base font-bold">Transaction ID</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">{e?.trans_Id}</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-base font-bold">You Received</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">{e?.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
