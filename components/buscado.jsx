import React from 'react'
import Carproducto from './carproducto'
const Buscado = () => {
  return (
    <div className='flex gap-2.5 flex-col'>
      <h1 className='text-center text-red-700'>Lo más Buscado</h1>
      <div className='flex justify-end m-2'>
        <button className='rounded-xs p-0.5 text-sm w-[30%] flex items-center gap-2 justify-center bg-red-700 text-amber-100'>Ver más</button>
      </div>
      <div className='flex flex-row gap-3'>
        <Carproducto/>
        <Carproducto/>
      </div>
    </div>
  )
}

export default Buscado