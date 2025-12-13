import React from 'react'
import Navbar from '@/components/navbar'
import { Carrito } from '@/components/carrito'
import { FaWhatsapp } from "react-icons/fa6";
import Nav from '@/components/nav';
import Footer from '@/components/footer';
const Page = () => {
    return (
        <div>
            <Navbar />
            <div className='mt-22.5 flex flex-row justify-between items-center p-3 bg-red-500'>
                <div className='flex flex-col'>
                    <h1 className='text-white font-bold'>Tú carrito</h1>
                    <p className='text-white'>Total items: 4</p>
                </div>
                <p className='text-white font-bold'>Volver a la tienda</p>
            </div>
            <div className='flex gap-2 flex-col'>
                <Carrito />
                <Carrito />
                <Carrito />
                <Carrito />
            </div>
            <div className='rounded-t-3xl bg-white mt-10 p-5 flex flex-col'>
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Total productos (4) </p>
                    <p className='text-black'>$ 72.000</p>
                </div>
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Ahorro </p>
                    <p className='text-black'>$ 2.000</p>
                </div>
                <div className='flex flex-row text-lg font-bold justify-between' >
                    <p className='text-red-600'>Costo del envio</p>
                    <p className='text-black'>$ 15.000</p>
                </div>
                <span className='w-full h-0.5 bg-gray-400' />
                <div className='flex flex-row text-lg font-bold justify-between'>
                    <p className='text-red-600'>Total compra </p>
                    <p className='text-black'>$ 87.000</p>
                </div>
                <button className='rounded-none bg-red-700 text-white mt-3 flex gap-1 items-center justify-center text-lg p-2'><FaWhatsapp className='text-3xl' /> Continuar Compra por Whatsapp</button>
            </div>
            <Footer/>
        </div>
    )
}

export default Page