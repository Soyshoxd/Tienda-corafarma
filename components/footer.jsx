import React from 'react'
import Image from 'next/image'
import logo from "@/assets/logo.png"
const Footer = () => {
    return (
        <div className='Bg-gradient-to-r from-red-700 to-red-400 h-65 w-100% mt-20s flex flex-col'>
            <div className='flex flex-row text-red-700 gap-3'>
                <Image src={logo} alt="Logo.png" width={50} height={50} />
                <p>
                    DROGUERÍA  CORAFARMA
                </p>
            </div>
            <div className='flex flex-col text-red-700 w-50 ml-10'>
                <p>
                    Siempre contigo de 8 a.m  a
                    9 p.m ¡Todos los dias!
                </p>
            </div>
            <div className='flex flex-col text-red-700 ml-3 m-2'>
                <p>
                    Tu bienestar es nuestra prioridad
                </p>
            </div>
            <div className='flex flex-row text-red-700 ml-3 m-2'>
                <p>
                    Inicio
                    Tienda
                    Sobre nosotros
                </p>
            </div>
        </div>
    )
}
export default Footer