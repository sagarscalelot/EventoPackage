import React from 'react'

export default function InvoiceDetials() {
    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <a href="#" className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl"></i><h1>Invoice Details</h1></a>
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
                            <span className="block text-sm font-normal text-quicksilver pt-1">Sweet Love Catering</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-base font-bold">Transaction ID</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">Dgugkijmrol1529632</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-base font-bold">You Received</span>
                            <span className="block text-sm font-normal text-quicksilver pt-1">$560</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
