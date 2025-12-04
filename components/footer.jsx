import React from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
const Footer = () => {
    return (
        <div className='bg-gradient-to-b from-red-700 to-red-500 h-65 w-100% mt-20s flex flex-row justify-center items-center'>
            <div className='text-center m-2 flex flex-col'>
                <div className='flex flex-row text-white gap-3 items-center justify-center'>
                    <Image src={logo} alt="Logo.png" width={50} height={50} className='rounded-full' />
                    <p className='font-bold text-sm' >
                        DROGUERÍA  CORAFARMA
                    </p>
                </div>
                <div className='text-white m-2 gap-3 flex flex-col'>
                    <p>
                        Siempre contigo de 8 a.m  a
                        9 p.m ¡Todos los dias!
                    </p>
                    <p>
                        Tu bienestar es nuestra prioridad
                    </p>
                </div>
            </div>
                <div className='flex flex-col text-white ml-3 m-2'>
                    <h1 className='font-bold'>Enlaces rapidos</h1>
                    <ul>
                        <li>
                            Inicio
                        </li>
                        <li>
                            Tienda
                        </li>
                        <li>
                            Sobre nosotros
                        </li>
                    </ul>
                </div>
            </div>
            )
}
            export default Footer