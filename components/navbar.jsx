import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Link from 'next/link';
const Navbar = () => {
    return (
        <div className="bg-white flex p-3 items-center gap-3">
            <Image src={logo} alt="Logo" className="w-[50px] h-[50px] object-contain" />
                <input
                    className="w-[50%] rounded-full h-10 p-3 bg-gray-300 "
                    type="text"
                    placeholder="Droguería Corafarma"
                />
            <div className="flex gap-3">  
                <CgShoppingCart className='text-2xl'/>
                <FaRegHeart className='text-2xl'/>
                <IoMenu className='text-2xl text-red-700'/>
            </div>
        </div>
    )
}

export default Navbar
