"use client"

import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import Logo from "@/assets/logo.png"
import Image from 'next/image'

const RegisterPage = () => {

    //Creamos los estados para el formulario
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    //usamos router para redirigir
    const router = useRouter()

    //funcion para manejar el registro al darle al boton
    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)

        try{
            //registramos el usuario con firebase
            const cred = await createUserWithEmailAndPassword(auth, email, password)
            //guardamos el usuario en firestore
            await setDoc(doc(db, "users", cred.user.uid), {
                email,
                userName,
                createdAt: new Date()
            })
            //redireccionamos al home
            router.push("/")
        } catch (error) {
            alert("Error al registrar el usuario: " + error.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 text-center flex flex-col "> 
    <div className='flex justify-center'>
     <Image src={Logo} alt="Logo" className="w-20 h-20 object-contain rounded-full" />
     </div>
        <h1 className='text-2xl text-red-600 font-bold mb-5 items-center'>Crea tu cuenta</h1>
        <input className='border-b-2 w-[94%] ml-3 mb-4'
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input className='border-b-2 w-[94%] ml-3 mb-4'
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
        />
        <input className='border-b-2 w-[94%] ml-3 mb-4'
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button disabled={loading} className='rounded-none bg-red-700 text-white font-semibold ml-2 mr-2 py-2 mt-5'>
            {loading ? "Registrando..." : "Registrarse"}
        </button>
    </form>
  )
}

export default RegisterPage