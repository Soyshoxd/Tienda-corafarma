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
import Nav from '@/components/nav'
import BrandSlider from '@/components/slider-marcas'
const Home = () => {
  return (
    <div >
      <Navbar />
      <Slider />
      <div className="bg-gray-100 bg-cover bg-center bg-no-repeat bg-[url('/assets/fondo.png')]">
        <h1 className='text-center text-2xl font-bold text-red-600 m-2'>¡Todo en un click!</h1>
        <Categorias />
        <Recomedados />
        <Buscado />
        <Ofertas />
        <BrandSlider />
        <Maps />
        <Preguntas />
      </div>
      <Footer />
    </div>
  )
}
export default Home
