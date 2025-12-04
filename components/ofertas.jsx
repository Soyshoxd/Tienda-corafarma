import React from 'react'
import Image from 'next/image'
import ofertas from "@/assets/ofertas.png"
const Ofertas = () => {
    return (
        <div className='flex gap-1 flex-col'>
            <h1 className='text-center text-2xl font-bold text-red-600 m-2'>Caza Ofertas</h1>
               <Image src={ofertas} alt="ofertas"/>
        </div>
    )
}

export default Ofertas