import React from 'react'
import BrandSlider from './slider-marcas'
const Lomejor = () => {
    return (
        <div className='flex gap-1 flex-col'>
            <h1 className='text-center text-2xl font-bold text-red-600 m-2'>Lo mejor de lo mejor</h1>
            <div className='flex flex-row items-center gap-0.5'>
                <BrandSlider />
            </div>
        </div>
    )
}
export default Lomejor