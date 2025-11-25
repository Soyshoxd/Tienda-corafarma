import React from 'react'
import Image from 'next/image'
import ofertas from "@/assets/ofertas.png"
const Ofertas = () => {
    return (
        <div className='flex gap-1 flex-col'>
            <h1 className='text-center text-red-700'>Caza Ofertas</h1>
            <div className=''>
            </div>
               <Image src={ofertas} alt="ofertas"/>
        </div>
    )
}

export default Ofertas