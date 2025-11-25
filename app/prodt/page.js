import Categorias from '@/components/categorias'
import Navbar from '@/components/navbar'
import { FaFilter } from "react-icons/fa"
import React from 'react'
import Carproducto from '@/components/carproducto'
import Footer from '@/components/footer'

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className='ml-2 text-xs text-neutral-600'>
        <h1>Inicio | Tienda | Licores</h1>
      </div>
      <div className='items-center m-3'>
        <h1 className='text-center text-red-700'>Productos de drogeria y más</h1>
        <h1 className=''>
          Encuentra medicamentos, vitaminas, productos de aseo, paquetería y mucho más en un solo lugar.
        </h1>
      </div>
      <Categorias />
      <div className='flex flex-row ml-4 mt-3 justify-between items-center'>
        <div className='flex flex-row ml-0.1 justify-center gap-1'>
          <p>
            mostrar
          </p>
          <select name="numeros">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <p>por página</p>
        </div>
        <button className='rounded-xs bg-neutral-300 p-1 mr-2.5 flex flex-row gap-1.5 items-center'>
          <FaFilter />
          Filtrar por:
        </button>
      </div>
      <div className='grid grid-cols-3 ml-3 mr-3 mt-3'>
        <Carproducto />
        <Carproducto />
        <Carproducto />
        <Carproducto />
        <Carproducto />
        <Carproducto />
        <Carproducto />
      </div>
      <div className='ml-5'>
        <p>mostrando 1-10 de 17 productos</p>
      </div>
      <div className='mt-5'>
          <Footer/>
      </div>
    </div>
  )
}
export default Page