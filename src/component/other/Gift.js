import React from 'react'
import { Link } from 'react-router-dom'
import chanel from '../../assest/images/chanel.png'
import puma from '../../assest/images/puma.png'
import pepsi from '../../assest/images/pepsi.png'
import nike from '../../assest/images/nike.png'
import starbucks from '../../assest/images/starbucks.png'
import dominos from '../../assest/images/dominos.png'
import ola from '../../assest/images/ola.png'
import adidas from '../../assest/images/adidas.png'
import gost from '../../assest/images/gost.png'
import hm from '../../assest/images/h-m.png'

const Gift = () => {
    return (
        <div className="wrapper">
            <h1>What is Your Business?</h1>
            <div className="flex flex-wrap pt-7 -mx-4">
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={chanel} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={puma} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={pepsi} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={nike} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={starbucks} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={dominos} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={ola} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={adidas} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={gost} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
                <Link to="" className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 py-3 group">
                    <div className="text-center bg-white rounded flex flex-col justify-center items-center h-full px-7 py-8 border-2 border-transparent group-hover:border-2 group-hover:border-spiroDiscoBall">
                        <img src={hm} alt="" className="flex justify-center items-center m-auto" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Gift