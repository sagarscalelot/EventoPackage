import React, { useState } from 'react';

function EventPopUpDiscountOnTotalBill({ handleClose, eventId, setSelectedDiscount, selectedDiscount, serviceOn, activeList }) {
  const [value, setValue] = useState("");
  const token = localStorage.getItem("Token");
  const [error, setError] = useState("");

  const header = {
    'Authorization': `Token ${token}`
  }

  const [discount, setDiscount] = useState(selectedDiscount.discount);
  const [tandc, setTandc] = useState(selectedDiscount.tandc);
  const [isValid, setIsValid] = useState(false)


  const validateDiscount = (e) => {
    setIsValid(false)
    if (!e.target.value || e.target.value == '') {
      setError("Discount Is Required");
      handleClose(true)
    } else if ((e.target.value <= 100) && (e.target.value > 0)) {
      console.log(e.target.value);
      setValue(e.target.value);
      setDiscount(e.target.value);
      setError(null);
      setIsValid(true)
    } else {
      handleClose(true)
      setError("Enter Valid Discount value");
    }
  }

  const handleSubmit = async () => {
    if (isValid) {
      console.log(discount);
      handleClose(false)
      setDiscount(discount);
      selectedDiscount.discount = discount + "%";
    }
  }

  return (
    //   <!--  Discount On Total Bill/ Advance and Discount Confirmation  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-7 space-y-7">
            <h2 className="h1 w-full max-w-xs text-center mx-auto"> Discount On Total Bill {isValid}</h2>
            <form>
              <div className={serviceOn ? "w-full lg:w-1/2 inputHolder" : "w-full inputHolder"}>
                <label className="input-titel">Discount On Total Bill</label>
                <input className="input option" type="number" onChange={validateDiscount} />
                <span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{error} </span>
              </div>
            </form>
            <ul className="space-y-2.5">
              <li className="text-xs font-medium">* Terms & Conditions</li>
              {selectedDiscount?.tandc}
            </ul>
            <div className="flex items-center space-x-5">
              <button onClick={() => handleClose(false)} className="btn-primary btn-cancel w-full">CANCEL</button>
              <button onClick={handleSubmit} className="btn-primary w-full">APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventPopUpDiscountOnTotalBill