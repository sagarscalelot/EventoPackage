import React, { useState } from 'react'
import $ from 'jquery';

function FAQ() {
    const [isopen, setIsOpen] = useState()

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

    return (
        <div className="wrapper min-h-full">
            <div className="space-y-7 h-full">
                {/* <!-- title-holder  --> */}
                <div className="w-full space-y-7">
                    <h1>FAQ</h1>
                    <div className="Accordions w-full space-y-5">
                        <div className="Accordion_item">
                            <h3 className="title_tab">What is the meaning of Lorem ipsum?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h3>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>You can create a new account at the end of the order process or on the following page: Create new account. You can view all of your orders and subscriptions in your customer account. You can also change your addresses and your password.</p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h3 className="title_tab active">Where on your website can I open a customer account?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h3>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>You can create a new account at the end of the order process or on the following page: Create new account. You can view all of your orders and subscriptions in your customer account. You can also change your addresses and your password.</p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h3 className="title_tab">Do I need to create an account to make an order?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h3>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>You can create a new account at the end of the order process or on the following page: Create new account. You can view all of your orders and subscriptions in your customer account. You can also change your addresses and your password.</p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h3 className="title_tab">Why do the prices in the shop sometimes change?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h3>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>You can create a new account at the end of the order process or on the following page: Create new account. You can view all of your orders and subscriptions in your customer account. You can also change your addresses and your password.</p>
                            </div>
                        </div>
                        <div className="Accordion_item">
                            <h3 className="title_tab">Do you also sell magazines that have been financed by crowdfunding?<span>
                                <i className="icon-plus"></i>
                                <i className="icon-minus text-[3px]"></i>
                            </span>
                            </h3>
                            <div className="inner_content" style={{ display: 'none' }}>
                                <p>You can create a new account at the end of the order process or on the following page: Create new account. You can view all of your orders and subscriptions in your customer account. You can also change your addresses and your password.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default FAQ;
