import Categorias from '@/components/categorias'
import Navbar from '@/components/navbar'
import Slider from '@/components/slider'
import Recomedados from '@/components/recomedados'
import Buscado from '@/components/buscado'
import Ofertas from '@/components/ofertas'
import Lomejor from '@/components/lomejor'
import Maps from '@/components/maps'
import Preguntas from '@/components/preguntas'
import Footer from '@/components/footer'
import React from 'react'
const Home = () => {
  return (
    <div className="bg-gray-300 bg-cover bg-center w-full h-screen">
      <Navbar />
      <Slider />
       <h1 className='text-center'>¡Todo en un click!</h1>
      <Categorias />
      <Recomedados />
      <Buscado />
      <Ofertas />
      <Lomejor />
      <Maps />
      <Preguntas />
      <Footer/>
    </div>
  )
}
export default Home
