import React from 'react'
import dolex from "@/assets/dolex.webp"
import Image from 'next/image'
import { FaShoppingCart } from "react-icons/fa";
const Carproducto = () => {
  return (
    <div className=' flex flex-row gap-2'>
       <div className='rounded-md bg-white shadow-lg p-2 h-66 w-40'>
       <Image src={dolex} alt="dolex.webp h-5 w-5 "/>
        <p className='text-gray-400 text-[11px]'>Medicamentos</p>
        <h1 className='font-bold text-sm'>Dolex Gripa</h1>
        <p className='text-[10px]'>Caja X 12 Tabletas</p>
        <p className='text-[15px] text-right'>$18.000</p>
        <button className='rounded-xs p-0.5 text-sm w-full flex items-center gap-2 justify-center bg-red-700 text-amber-100'><FaShoppingCart />añadir al carrito</button>
       </div>
    </div>   
  )
}

export default Carproducto