import React from 'react'
import Image from 'next/image'
import lubri from "@/assets/lubri.png"
import rexona from "@/assets/rexona.jpg"
import asepxia from "@/assets/asepxia.png"
const Lomejor = () => {
    return (
        <div className='flex gap-1 flex-col'>
            <h1 className='text-center text-red-700'>Lo mejor de lo mejor</h1>
            <div className='flex flex-row items-center gap-0.5'>
                <Image src={lubri} alt="lubri.png" className='w-30 h-30' />
                <Image src={rexona} alt="rexona.jpeg" className='w-30 h-30' />
                <Image src={asepxia} alt="asepxia.png" className='w-20 h-15' />
            </div>
        </div>
    )
}
export default Lomejor