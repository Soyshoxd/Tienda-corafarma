'use client';
import React, { useState } from 'react'
import logo from "@/assets/logo.png"
import logo_letras from "@/assets/logo_letras.jpg"
import Image from 'next/image'
import { IoSearch } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Categorias from './categorias';

const categorias = [
    {
        nombre: "Vitaminas",
        subcategorias: ["Vitamina C", "Inmunidad", "Multivitamínicos"]
    },
    {
        nombre: "Dermo",
        subcategorias: ["Protector solar", "Cuidado facial", "Cremas corporales"]
    },
    {
        nombre: "Bebés",
        subcategorias: ["Pañales", "Leches", "Cuidado del bebé"]
    }
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [tiendaOpen, setTiendaOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <nav className='max-w-6xl mx-auto flex items-center justify-between p-4'>
              <Link href="/"><Image src={logo} alt="Logo" className="w-[50px] h-[50px] object-contain" /></Link>
                <input
                    className="w-[50%] rounded-full h-10 p-3 bg-gray-300 "
                    type="text"
                    placeholder="Droguería Corafarma"
                />
                <ul className='hidden md:flex'>
                    <li>Inicio</li>
                    <li>Tienda</li>
                    <li>Sobre Nosotros</li>
                    <li>Ofertas</li>
                </ul>
                <div className="flex gap-3">
                  <Link href="/carrito"><CgShoppingCart className='text-2xl' /></Link>
                    <FaRegHeart className='text-2xl' />

                    <button className='md:hidden flex flex-col gap-1 z-50' onClick={() => setOpen(!open)}>
                        <span className={`block w-7 h-1 bg-red-600 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-7 h-1 bg-red-600 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`block w-7 h-1 bg-red-600 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>

                <div
                    className={`items-center fixed top-0 right-0 w-full h-screen overflow-y-auto bg-white shadow-xl p-6 pt-24 flex flex-col gap-6 text-lg font-medium transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
                >

                    <Image src={logo_letras} alt="Logo" className="w-54 h-54 object-contain rounded-full" />
                    <Link href="/login" className='text-red-600 font-semibold text-md'>Iniciar sesión / Registrarme</Link>
                    <div className='flex flex-row items-center gap-7'>
                        <span className='block w-32 h-1 bg-red-700' />
                        <h1>Menú</h1>
                        <span className='block w-32 h-1 bg-red-700' />
                    </div>
                    <div className='flex flex-col justify-between w-full p-3 text-2xl'>
                        <ul>
                            <li><Link href="/">Inicio</Link></li>

                            <li className='text-left'>
                                <div className='flex flex-row justify-between' onClick={() => setTiendaOpen(!tiendaOpen)}>
                                    <span>Tienda</span>
                                    {tiendaOpen ? <FaMinus /> : <FaPlus />}
                                </div>
                                {tiendaOpen && (
                                    <ul className='mt-2 ml-4'>
                                        {categorias.map((categoria, index) => (
                                            <li key={index} className='mb-2'>
                                                <Link href="/" >{categoria.nombre}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li className='text-left'>Ofertas del mes</li>
                            <li className='text-left'>Sobre nosotros</li>

                        </ul>
                        <span className='block w-full mt-9 h-1 bg-red-700'/>
                    </div>  
                </div>
            </nav>
        </header>
    )
}

export default Navbar
