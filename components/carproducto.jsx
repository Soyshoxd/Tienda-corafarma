import React from 'react'
import Image from 'next/image'
import { FaShoppingCart } from "react-icons/fa";
const Carproducto = ({producto}) => {
  return (
    <div className=' flex flex-row gap-2'>
       <div className='rounded-md bg-white shadow-lg p-2 h-66 w-40'>
       <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={160}
        height={160}
        className="object-contain"
      />
        <p className='text-gray-400 text-[11px]'>{producto.categoriaId}</p>
        <h1 className='font-bold text-sm'>{producto.nombre}</h1>
        <p className='text-[10px]'>{producto.descripcioncorta}</p>
        <p className='text-[15px] text-right'>${producto.precio.toLocaleString()}</p>
        <button className='rounded-xs p-0.5 text-sm w-full flex items-center gap-2 justify-center bg-red-700 text-amber-100'><FaShoppingCart />añadir al carrito</button>
       </div>
    </div>   
  )
}

export default Carproducto