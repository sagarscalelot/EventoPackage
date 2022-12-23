import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../../config';

function EventPopUpDiscountOnTotalBill({handleClose, eventId, setSelectedDiscount, selectedDiscount, serviceOn, activeList}) {
  // console.log("hi : ", selectedDiscount);
  const [value, setValue] = useState("");
  const token = localStorage.getItem("Token");
  const [error, setError] = useState("");
  // let discountId = totalDiscountId || advanceDiscountId;
	const header = {
		'Authorization': `Token ${token}`
	}
  const [pdata, setpdata] = useState({});
  const [discountname, setDiscountname] = useState(selectedDiscount.discountname);
  const [discounttype, setDiscounttype] = useState(selectedDiscount.discounttype);
  const [description, setDescription] = useState(selectedDiscount.description);
  const [discount, setDiscount] = useState(selectedDiscount.discount);
  const [tandc, setTandc] = useState(selectedDiscount.tandc);

  // console.log("select dis in on bill : ", selectedDiscount);
  const validateDiscount = (e) => {
		if((e.target.value <= 100) && (e.target.value >= 0)) {
			setValue(e.target.value);
      setDiscount(e.target.value);
      selectedDiscount.discount = e.target.value + "%";
			// console.log("discount :", value);
      setError(null);
		} else {
			setError("Enter Valid Discount value");
		}
	}

	const handleSubmit = async() => {
    // setSelectedDiscount({ ...selectedDiscount,
    //   discountname: discountname,
    //   discounttype: discounttype,
    //   description: description,
    //   discount: discount + "%",
    //   tandc : tandc 
    // });
		// try {	
		// 	// const response = await axios.put(`${baseUrl}/api/org/discount/${discountId}?event_id=${eventId}`,{equipment_id: [], discount: value+"%"},{headers: header});
		// 	// console.log(response);
    //   // handleClose(false);
    //   console.log("Before post on totla : ", activeList);
    //   const response = await axios.post(`${baseUrl}/organizer/events/discount`,{eventid: eventId, discounts: activeList},{headers: header});

		// 	console.log("res : ",response);

		// 	handleClose(false);
		// } catch (error) {
		// 	console.log(error);
		// }
    setDiscount(discount);
    handleClose(false);
	}

  return (
	//   <!--  Discount On Total Bill/ Advance and Discount Confirmation  -->
	  <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-7 space-y-7">
            <h2 className="h1 w-full max-w-xs text-center mx-auto"> Discount On Total Bill </h2>
            <form>
              <div className={serviceOn ? "w-full lg:w-1/2 inputHolder" : "w-full inputHolder"}>
									<label className="input-titel">Discount On Total Bill</label>
									<input className="input option" type="text" onChange={validateDiscount} />
									<span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{error} </span>
								</div>
            </form>
            <ul className="space-y-2.5">
              <li className="text-xs font-medium">* Terms & Conditions</li>
              {selectedDiscount?.tandc}
            </ul>
            <div className="flex items-center space-x-5">
			      <button onClick={()=>handleClose(false)} className="btn-primary btn-cancel w-full">CANCEL</button>
            <button onClick={handleSubmit} className="btn-primary w-full">APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventPopUpDiscountOnTotalBill