import React from 'react'
import slider from "@/assets/slider.png"
import Image from 'next/image'
const Slider = () => {
  return (
    <div className='W-[100%]'>
        <Image src={slider} alt="slider" />
    </div>
  )
}

export default Slider