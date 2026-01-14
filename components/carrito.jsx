'use client'
import React from 'react'
import dolex from "@/assets/dolex.webp"
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
export const Carrito = () => {
    const { cart, loading, updatedQuantity, removeItem } = useCart();

    if (loading) return <div>Cargando carrito...</div>;
    if (cart.length === 0) return <div>Tu carrito está vacío.</div>;

    return (

        <div>
            {
                cart.map((item) => (
                    <div key={item.id} className='flex flex-row gap-2'>
                        <div className='ms-2'>
                            <Image src={item.imagen} alt={item.nombre} width={300} height={300} className='h-25 w-25' />
                        </div>
                        <div>
                            <div className='mt-3 flex items-center gap-2'>
                                <h1 className='font-bold'>{item.nombre}</h1>
                                <p className='text-xs text-gray-400'>Medicamentos</p>
                            </div>
                            <div className="text-rigth">
                                {item.precio != item.precioFinal && (
                                    <p className="text-md line-through decoration-red-500 decoration-2 text-gray-400">
                                        ${item.precio.toLocaleString()}(normal)
                                    </p>
                                )}

                                <p className="text-md font-bold text-red-700">
                                    ${item.precioFinal.toLocaleString()}
                                </p>
                            </div>

                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => updatedQuantity(item.id, item.quantity - 1)}
                                className="flex items-center justify-center w-8 h-8 rounded-full 
               bg-red-600 text-white text-lg font-bold
               hover:bg-red-700 active:scale-95 transition"
                            >
                                −
                            </button>

                            <span className="min-w-[32px] text-center text-lg font-semibold">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => updatedQuantity(item.id, item.quantity + 1)}
                                className="flex items-center justify-center w-8 h-8 rounded-full 
               bg-red-600 text-white text-lg font-bold
               hover:bg-red-700 active:scale-95 transition"
                            >
                                +
                            </button>
                        </div>

                    </div>
                ))
            }
        </div>

    )
}
