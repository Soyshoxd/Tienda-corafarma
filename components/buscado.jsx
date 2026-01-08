import React from 'react'
import Carproducto from './carproducto'
import { getProductos } from '@/lib/firebase-cache'
const Buscado = async () => {
  const productos = await getProductos()
  return (
    <div className='flex gap-2.5 flex-col'>
      <h1 className='text-center text-2xl font-bold text-red-600 m-2'>Lo más Buscado</h1>
      <div className='flex justify-end m-2'>
        <button className='rounded-xs p-0.5 text-sm w-[30%] flex items-center gap-2 justify-center bg-red-700 text-amber-100'>Ver más</button>
      </div>
      <div className='flex justify-center flex-row gap-3'>
        {productos.map(producto => (
          <Carproducto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </div>
  )
}

export default Buscado