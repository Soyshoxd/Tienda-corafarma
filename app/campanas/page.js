import React from 'react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import Oferta from "@/assets/Oferta.png"
import dulce from "@/assets/Dulce.png"
import aguardiente from "@/assets/Aguardiente.png"
import Carproducto from '@/components/carproducto'
import licor from "@/assets/licor.png"
import maquillaje from "@/assets/maquillaje.png"
import Footer from '@/components/footer'
const Page = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-22 flex gap-4 items-center justify-center'>
        <Image src={Oferta} alt="oferta" />
      </div>
      <div className='flex flex-row gap-4 items-center justify-center p-3 h-66 mt-3'>
        <div className='w-40 h-40 flex items-center justify-center'>
          <Image src={dulce} alt='dulce' className='mx-auto' />
        </div>
        <div className='w-35 h-35 flex items-center justify-center'>
          <Carproducto />
        </div>
      </div>
      <div className='mt-22 flex gap-4 items-center justify-center'>
        <div className='w-35 h-35 flex items-center justify-center'>
          <Carproducto />
        </div>
        <div className='w-40 h-40 flex items-center justify-center'>
          <Image src={licor} alt='licor' className='mx-auto' />
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center justify-center p-3 h-66 mt-20'>
        <div className='w-40 h-40 flex items-center justify-center'>
          <Image src={maquillaje} alt='maquillaje' className='mx-auto' />
        </div>
        <div className='w-35 h-35 flex items-center justify-center'>
          <Carproducto />
        </div>
      </div>
      <div className='mt-10'>
        <Footer />
      </div>
    </div>

  )
}

export default Page