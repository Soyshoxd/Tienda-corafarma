import Navbar from '@/components/navbar'
import Image from 'next/image'
import nosotros from "@/assets/nosotros.jpg"
import mision from "@/assets/mision.png"
import vision from "@/assets/vision.png"
import Footer from '@/components/footer'
import React from 'react'
const Pages = () => {
  return (
    <div>
      <div className='flex justify-center flex-col mt-20'>
        <h1 className='text-center text-red-500 text-xl font-extrabold mt-2'>Sobre Nosotros</h1>
        <p className='mt-2 ml-3 mr-3'>En nuestra drogueria no solo encuentras medicamentos, encuentras confianza, cuidado y cercanía. Cada día trabajamos para que tengas a la mano todo lo que necesitas: salud, belleza, bienestar y productos de uso diario, siempre con una atención rápida y amable.

          Sabemos que tu familia es lo más importante, por eso te escuchamos, te orientamos y te acompañamos en lo que necesites. Queremos que sientas la tranquilidad de estar en un lugar donde tu bienestar siempre será la prioridad.

          Más que una droguería, somos ese punto de confianza en tu barrio donde sabes que encontrarás una mano amiga, precios justos y un equipo dispuesto a ayudarte con una sonrisa.</p>
      </div>
      <Image src={nosotros} alt='nosotros.jpg' className='w-80 h-80 ml-13' />
      <div className='flex flex-row ml-5'>
        <div className=''>
          <h1 className='items-center flex justify-center text-red-700 font-extrabold text-xl'>
            Misión
          </h1>
          <p>
            Contribuir a la salud y bienestar de las familias cajiqueñas mediante la comercialización de productos farmaceuticos y populares del mercado.
          </p>
        </div>
        <Image src={mision} alt='mision.png' className='w-45 h-45 mr-2' />
      </div>
      <div className='flex flex-row ml-5 items-center'>
        <Image src={vision} alt='vison.png' className='w-45 h-45 m-4' />
        <div className=''>
          <h1 className='items-center flex justify-center text-red-700 font-extrabold text-xl'>
            Visión
          </h1>
          <p className='mr-4'>
            Nos proyectamos en ser el referente destacado en el sector, enfocándonos en proporcionar servicios farmacéuticos de alta calidad y productos de bienestar integral. Nuestra visión se basa en ser más que una simple droguería; deseamos ser un destino  confiable y acogedor para todos aquellos que buscan mejorar su salud y calidad de vida.
          </p>
        </div>
      </div>
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  )
}

export default Pages