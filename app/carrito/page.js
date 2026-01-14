'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import { Carrito } from '@/components/carrito'
import { FaWhatsapp } from "react-icons/fa6";
import Footer from '@/components/footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
const Page = () => {
    const { cart,totalItems } = useCart();

    const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.precioFinal * item.quantity,
        0
    )
    const subtotal = cart.reduce((sum,item) => sum + item.precio * item.quantity, 0);
    const totalSavings = cart.reduce((sum, item) => sum + (item.precio - item.precioFinal) * item.quantity, 0);


    return (
        <div>
            <div className='mt-22.5 flex flex-row justify-between items-center p-3 bg-red-500'>
                <div className='flex flex-col'>
                    <h1 className='text-white font-bold'>Tú carrito</h1>
                    <p className='text-white'>Total items: {totalItems}</p>
                </div>
                <Link href="/tienda" className='text-white font-bold hover:text-gray-200'>Volver a la tienda</Link>
            </div>
            <div className='flex gap-2 flex-col'>
                <Carrito />
            </div>
            <div className='rounded-t-3xl bg-white mt-10 p-5 flex flex-col'>
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Total productos ({totalProducts}) </p>
                    <p className='text-black'>$ {subtotal.toLocaleString()}</p>
                </div>
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Ahorro </p>
                    <p className='text-black'>$ {totalSavings.toLocaleString()}</p>
                </div>

                <span className='w-full h-0.5 bg-gray-400' />
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Total compra </p>
                    <p className='text-black'>$ {totalPrice.toLocaleString()}</p>
                </div>
                <button className='rounded-none bg-red-700 text-white mt-3 flex gap-1 items-center justify-center text-lg p-2'><FaWhatsapp className='text-3xl' /> Continuar Compra por Whatsapp</button>
            </div>
            <Footer />
        </div>
    )
}

export default Page