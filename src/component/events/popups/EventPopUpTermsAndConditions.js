import React from 'react'
import { useEffect } from 'react'

function EventPopUpTermsAndConditions({handleClose, terms, saveData}) {

	
	useEffect(() => {
		const box = document.getElementById("termsBox");
		box.innerHTML = "Evento Package is an online service offered by the Company. By accessing or using any website with an authorized link to the Website and/or the App, registering an account, or accessing or using any content, information, services, features, or resources available or enabled via the Website and/or the App, clicking on a button or taking another action to signify your acceptance of this Agreement, you:";
	}, [terms]);
	
  return (
		//  <!--  Terms and Conditions  -->
		 <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
		 <div className="table-cell align-middle">
		   <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
			 <div className="bg-brightGray p-7 space-y-7">
			   <h2 className="h1 w-full max-w-xs"> Terms and Conditions </h2>

			   <div id="termsBox" ></div>
			
			   <div className="flex items-center space-x-5">
				 <button onClick={()=>{handleClose(false)}} className="btn-primary btn-cancel w-full">CANCEL</button>
				 <div className="btn-primary w-full"onClick={()=> {saveData(); handleClose(false)}} >APPLY</div>
			   </div>
			 </div>
		   </div>
		 </div>
	   </div>
	)
}

export default EventPopUpTermsAndConditions