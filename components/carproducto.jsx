'use client'
import React from 'react'
import Image from 'next/image'
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '@/context/CartContext';
import { getDiscountedPrice } from '@/utils/pricing';
const Carproducto = ({ producto }) => {
  const { addItem, isGuest } = useCart()

  const priceFinal = getDiscountedPrice(
    producto.precio,
    producto.descuento
  )
  return (
    <div className=' flex flex-row gap-2'>
      <div className='rounded-md bg-white shadow-lg p-2 h-66 w-40'>
        {producto.descuento > 0 && (
          <div className='z-10 bg-red-600 text-white px-2 py-1 rounded-sm absolute'>
            <span className="text-xs font-bold ">
              -{producto.descuento}%
            </span>
          </div>
        )}
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
        <div className="text-center flex flex-row justify-between">
          {producto.descuento > 0 && (
            <p className="text-md line-through decoration-red-500 decoration-2 text-gray-400">
              ${producto.precio.toLocaleString()}
            </p>
          )}

          <p className="text-md font-bold text-red-700">
            ${priceFinal.toLocaleString()}
          </p>
        </div>


        <button
          onClick={() =>
            addItem({
              id: producto.id, // 🔑 IMPORTANTE
              nombre: producto.nombre,
              precio: producto.precio,
              imagen: producto.imagen,
              precioFinal: getDiscountedPrice(
                producto.precio,
                producto.descuento
              ),
            })
          }
          className="rounded-xs p-0.5 text-sm w-full flex items-center gap-2 justify-center bg-red-600 text-amber-100"
        >
          <FaShoppingCart />
          añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default Carproducto