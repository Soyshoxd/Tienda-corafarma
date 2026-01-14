'use client';
import React, { useEffect, useRef, useState } from 'react'
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
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { buildCategorias } from '@/utils/buildCategorias';
import SearchBar from './SearchBar';

const Navbar = ({ categorias }) => {
    const [open, setOpen] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);

    const [tiendaOpen, setTiendaOpen] = useState(false);
    const { totalItems } = useCart()
    const { user, loading } = useAuth()
    const userMenuRef = useRef(null)

    const [openId, setOpenId] = useState(null)

    function toggle(id) {
        setOpenId(prev => (prev === id ? null : id))
    }

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(e.target)
            ) {
                setOpenDropDown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])


    if (!Array.isArray(categorias)) return []

    const categoriasConHijas = categorias
        .filter(cat => cat.parentId === null)
        .map(cat => ({
            ...cat,
            subcategorias: categorias.filter(
                sub => sub.parentId === cat.id
            )
        }))

    return (
        <>
            <nav className="w-full bg-white  fixed top-0 left-0 z-50">
                <div className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
                    <Link href="/"><Image src={logo} alt="Logo" className="w-[50px] h-[50px] object-contain" /></Link>
                    <SearchBar />
                    <ul className='hidden md:flex'>
                        <li>Inicio</li>
                        <li>Tienda</li>
                        <li>Sobre Nosotros</li>
                        <li>Ofertas</li>
                    </ul>
                    <div className="flex gap-3">
                        <Link href="/carrito">
                            <div className="relative hover:text-red-500 transition-colors" title="Carrito">
                                <CgShoppingCart className="text-lg" size={26} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <FaRegHeart className='text-2xl' />
                        <div className="relative">
                            <button onClick={() => setOpenDropDown(!openDropDown)} className='cursor-pointer'>
                                <FaUserCircle className="text-lg hover:text-red-600 transition-colors" size={26} />
                            </button>
                        </div>

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

                        {!user ? (
                            <div className='font-bold text-xl'>
                                <Link
                                    href="/login"
                                    className=" hover:text-red-600"
                                >
                                    Iniciar sesión
                                </Link>
                                <span className="mx-2 text-gray-500">/</span>
                                <Link
                                    href="/register"
                                    className=" rounded-lg text-red-600 hover:text-black"
                                >
                                    Registrarse
                                </Link>
                            </div>
                        ) : (
                            <button className="flex items-center gap-2">
                                <span className="font-medium text-xl">
                                    Hola! <span className='text-red-700 font-bold'>{user.displayName || user.email}</span>
                                </span>
                            </button>
                        )}
                        <div className='flex flex-row items-center gap-7'>
                            <span className='block w-32 h-1 bg-red-700' />
                            <h1>Menú</h1>
                            <span className='block w-32 h-1 bg-red-700' />
                        </div>
                        <div className='flex flex-col justify-between w-full text-2xl'>
                            <ul>
                                <li><Link href="/">Inicio</Link></li>

                                <li className='text-left'>
                                    <div className='flex flex-row justify-between' onClick={() => setTiendaOpen(!tiendaOpen)}>
                                        <span><Link href="/tienda">Tienda</Link></span>
                                        {tiendaOpen ? <FaMinus className='text-red-600' /> : <FaPlus className='text-red-600' />}
                                    </div>
                                    {tiendaOpen && (
                                        <ul className="flex flex-col gap-2 pl-4">
                                            {categoriasConHijas.map((categoria) => (
                                                <li key={categoria.id} className="text-left">

                                                    {/* Categoría padre */}
                                                    <div className="flex justify-between items-center">
                                                        <Link href={`/categoria/${categoria.slug}`}>
                                                            {categoria.nombre}
                                                        </Link>

                                                        {/* Botón + / - SOLO si tiene subcategorías */}
                                                        {categoria.subcategorias.length > 0 && (
                                                            <button
                                                                onClick={() => toggle(categoria.id)}
                                                                className="ml-2 text-red-600"
                                                            >
                                                                {openId === categoria.id ? <FaMinus /> : <FaPlus />}
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Subcategorías */}
                                                    {openId === categoria.id && (
                                                        <ul className="ml-4 mt-2 flex flex-col gap-1 pl-3">
                                                            {categoria.subcategorias.map(sub => (
                                                                <li key={sub.id} className="text-md text-gray-700">
                                                                    <Link href={`/categoria/${sub.slug}`}>
                                                                        {sub.nombre}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                                <li className='text-left'><Link href="/ofertas-mes">Ofertas del mes</Link></li>
                                <li className='text-left'><Link href="/sobre-nosotros">Sobre nosotros</Link></li>

                            </ul>
                            <span className='block w-full mt-9 h-1 bg-red-700' />
                        </div>
                    </div>
                </div>

            </nav>
            {/* DROPDOWN */}
            {openDropDown && (
                !user ? (
                    <div className="w-40 z-50 right-0.5 mt-8 border-b bg-white absolute " ref={userMenuRef}>
                        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
                            <p>Bienvenid@ para obtener más beneficios:</p>
                            <Link
                                href="/login"
                                className=" bg-gray-600 p-1 rounded-lg text-center text-white hover:text-red-600"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                href="/register"
                                className=" rounded-lg bg-red-600 p-1 text-center text-white hover:text-black"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="w-40 z-50 right-0.5 mt-8 border-b bg-white absolute">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
                            <Link href="/perfil" className="hover:text-red-600">
                                Mi perfil
                            </Link>

                            <Link href="/pedidos" className="hover:text-red-600">
                                Mis pedidos
                            </Link>

                            <button
                                onClick={async () => {
                                    await signOut(auth)
                                    setOpenDropDown(false)
                                }}
                                className="text-left text-red-600 font-medium"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )

            )}
        </>
    )
}

export default Navbar
