import Image from 'next/image'
import drogas from "@/assets/drogas.png"
import sabritas from "@/assets/sabritas.jpeg"
import dulceria from "@/assets/dulceria.webp"
import LICORES from "@/assets/LICORES.jpeg"
import REGALOS from "@/assets/REGALOS.jpg"
import React from 'react'
const Categorias = () => {
  return (
    <div className='flex gap-2.5 flex-col '>
      <div className=' flex flex-row gap-2 m-1'>
        <div className='flex items-center flex-col gap-2'>
          <div className='rounded-full border-2 w-12 border-black flex'>
            <Image src={drogas} alt='drogas.png' className='w-12 h-12 object-cover' />
          </div>
          <div className=' text-black font-semibold gap-2'>
            <p>Droguería</p>
          </div>
        </div>
        <div className='flex items-center flex-col gap-2'>
          <div className='rounded-full border-2 w-12 border-black overflow-hidden'>
            <Image src={sabritas} alt='sabritas.jpeg' className='object-cover w-12 h-12' />
          </div>
          <div className=' text-black font-semibold'>
            <p>Paquetería</p>
          </div>
        </div>
        <div className='flex items-center flex-col gap-2'>
          <div className='rounded-full border-2 w-12 border-black overflow-hidden'>
            <Image src={dulceria} alt='dulceria.webp' className='object-cover w-12 h-12' />
          </div>
          <div className='text-black font-semibold'>
            <p>Dulcería</p>
          </div>
        </div>
        <div className='flex items-center flex-col gap-2'>
          <div className='rounded-full border-2 w-12 border-black overflow-hidden'>
            <Image src={LICORES} alt='LICORES.jpeg' className='object-cover w-12 h-12' />
          </div>
          <div className='text-black font-semibold'>
            <p>Licorería</p>
          </div>
        </div>
      <div className='flex items-center flex-col gap-2'>
        <div className='rounded-full border-2 w-12 border-black overflow-hidden'>
          <Image src={REGALOS} alt='REGALOS.jpg' className='object-cover w-12 h-12' />
        </div>
        <div className='text-black font-semibold'>
          <p>Licores</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Categorias