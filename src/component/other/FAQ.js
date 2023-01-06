import React, { useEffect, useState } from 'react'
import $ from 'jquery';

function FAQ() {
    const [isopen, setIsOpen] = useState()



    useEffect(() => {
        var $titleTab = $('.title_tab');
        $('.title_tab.active').next('.inner_content').slideDown();
        $titleTab.on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).next().stop().slideUp(500);
                $(this).next().find('p').removeClass('show');
            } else {
                $(this).addClass('active');
                $(this).next().stop().slideDown(500);
                $(this).parent().siblings().children('.title_tab').removeClass('active');
                $(this).parent().siblings().children('.inner_content').slideUp(500);
                $(this).parent().siblings().children('.inner_content').find('p').removeClass('show');
                $(this).next().find('p').addClass('show');
            }
        });
    }, [])


    return (
        <div className="wrapper min-h-full">
            <div className="space-y-7 h-full">
                {/* <!-- title-holder  --> */}
                <div className="w-full space-y-7">
                    <h1>FAQ</h1>
                    <br/>
                    <h5>login</h5>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">What shall I do if I do not receive OTP?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>
                                    If you did not receive OTP by email or mobile number, then please contact us and send your complaint via email on the email address <a href="mailto:help@eventopackage.com" className="text-black font-bold">help@eventopackage.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">While setting the password, it shows PASSWORD ERROR.<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>While setting the password, make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.<b className="font-bold text-black"> For example- ABCDE12$</b></p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">What should I do if I forget my password?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>In case you forget your password, please follow the following steps:</p>
                                <ul className="list-decimal pl-5 mt-0">
                                    <li className="">Click on the forgot password option.</li>
                                    <li className="">Enter your mobile number.</li>
                                    <li className="">Confirm your OTP once you receive it on the above entered number.</li>
                                    <li className="">Reset Your Password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h5>App Functioning</h5>
                       
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">Dashboard screen of the app is not properly visible. And not   filteration,How can I solve it?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>
                                If the main screen of the app is not properly visible, please email the following things to us on help@eventopackage.com 
                                - Name of your device from which you are using the app.
                                - Upload screenshots of the problem that is occurring on the screen.
                                - Describe the problem in 250 words.
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">Why is the search Tab not working properly on my device?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>The search engine may not give proper output in case of two situations:
                                 - Your device capacity may not be suitable with the app.
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">The search screen is not properly visible on the device ?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>If the search screen of the app is not properly visible, please email the following things to us on help@eventopackage.com 
                                - Name of your device from which you are using the app.
                                - Upload screenshots of the problem that is occurring on the screen.
                                - Describe the problem in 250 words.
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">Create form ?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>If any problem occurs in the flow while creating a service, please email the following things to us on help@eventopackage.com

- Name of your device from which you are using the app.
- Upload screenshots of the problem that is occurring on the screen.
- Describe the problem in 250 words.

                                </p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h5>App Functionnig</h5>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">Dashboard screen of the app is not properly visible. And not   filteration,How can I solve it?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>

                                Dashboard screen of the app is not properly visible. And not   filteration,How can I solve it?

If the main screen of the app is not properly visible, please email the following things to us on <a href="mailto:help@eventopackage.com" className="text-black font-bold">help@eventopackage.com</a>
- Name of your device from which you are using the app.
- Upload screenshots of the problem that is occurring on the screen.
- Describe the problem in 250 words.




                                    If you did not receive OTP by email or mobile number, then please contact us and send your complaint via email on the email address 
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">While setting the password, it shows PASSWORD ERROR.<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>While setting the password, make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.<b className="font-bold text-black"> For example- ABCDE12$</b></p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">What should I do if I forget my password?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>In case you forget your password, please follow the following steps:</p>
                                <ul className="list-decimal pl-5 mt-0">
                                    <li className="">Click on the forgot password option.</li>
                                    <li className="">Enter your mobile number.</li>
                                    <li className="">Confirm your OTP once you receive it on the above entered number.</li>
                                    <li className="">Reset Your Password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h5>login</h5>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">What shall I do if I do not receive OTP?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>
                                    If you did not receive OTP by email or mobile number, then please contact us and send your complaint via email on the email address <a href="mailto:help@eventopackage.com" className="text-black font-bold">help@eventopackage.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">While setting the password, it shows PASSWORD ERROR.<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>While setting the password, make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.<b className="font-bold text-black"> For example- ABCDE12$</b></p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">What should I do if I forget my password?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>In case you forget your password, please follow the following steps:</p>
                                <ul className="list-decimal pl-5 mt-0">
                                    <li className="">Click on the forgot password option.</li>
                                    <li className="">Enter your mobile number.</li>
                                    <li className="">Confirm your OTP once you receive it on the above entered number.</li>
                                    <li className="">Reset Your Password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h5>login</h5>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">What shall I do if I do not receive OTP?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>
                                    If you did not receive OTP by email or mobile number, then please contact us and send your complaint via email on the email address <a href="mailto:help@eventopackage.com" className="text-black font-bold">help@eventopackage.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">While setting the password, it shows PASSWORD ERROR.<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>While setting the password, make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.<b className="font-bold text-black"> For example- ABCDE12$</b></p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">What should I do if I forget my password?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>In case you forget your password, please follow the following steps:</p>
                                <ul className="list-decimal pl-5 mt-0">
                                    <li className="">Click on the forgot password option.</li>
                                    <li className="">Enter your mobile number.</li>
                                    <li className="">Confirm your OTP once you receive it on the above entered number.</li>
                                    <li className="">Reset Your Password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h5>login</h5>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h6 className="title_tab active">What shall I do if I do not receive OTP?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p className=''>
                                    If you did not receive OTP by email or mobile number, then please contact us and send your complaint via email on the email address <a href="mailto:help@eventopackage.com" className="text-black font-bold">help@eventopackage.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">While setting the password, it shows PASSWORD ERROR.<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>While setting the password, make sure your password is of 8 characters, 5 alphabets, 2 number and 1 symbol.<b className="font-bold text-black"> For example- ABCDE12$</b></p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h6 className="title_tab">What should I do if I forget my password?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h6>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>In case you forget your password, please follow the following steps:</p>
                                <ul className="list-decimal pl-5 mt-0">
                                    <li className="">Click on the forgot password option.</li>
                                    <li className="">Enter your mobile number.</li>
                                    <li className="">Confirm your OTP once you receive it on the above entered number.</li>
                                    <li className="">Reset Your Password.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default FAQ;
