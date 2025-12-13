import React from 'react'
import dolex from "@/assets/dolex.webp"
import Image from 'next/image'
export const Carrito = () => {
    return (
        <div className='flex flex-row gap-2'>
            <div className='ms-2'>
                <Image src={dolex} alt="dolex.webp" className='h-25 w-25' />
            </div>
            <div>
                <div className='mt-3 flex items-center gap-2'>
                    <h1 className='font-bold'>Dolex Gripa</h1>
                    <p className='text-xs text-gray-400'>Medicamentos</p>
                </div>
                <p className='line-through decoration-red-500 decoration-3 text-gray-500'>$ 21.000 (normal)</p>
                <p className='font-medium'>$ 18.000</p>
            </div>
            <div className='flex items-center gap-2 justify-center'>
                <button className='rounded-full w-8 h-8 mt-3 bg-red-700 text-white font-extrabold'>+</button>
                <p className='mt-3 text-xl font-bold'>1</p>
                <button className='rounded-full w-8 h-8 mt-3 bg-red-700 text-white font-extrabold'>-</button>
            </div>
        </div>
    )
}
