"use client"

import { useState } from "react"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { FaRegUserCircle } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  //Estados para el formulario
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  //Función para manejar el login con Google
  async function handleGoogleLogin() {
    setLoading(true)
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Verificar si el usuario ya existe en Firestore
      const userRef = doc(db, "users", user.uid)
      const snap = await getDoc(userRef)

      // Si no existe, crearlo
      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          provider: "google",
          createdAt: serverTimestamp(),
        })
      }
      // Redirigir al usuario al home
      router.push("/")
    } catch (error) {
      alert("Error al iniciar sesión con Google")
    } finally {
      setLoading(false)
    }
  }

  //Función para manejar el login con email y contraseña
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch {
      alert("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <FaRegUserCircle className="ml-2 text-8xl text-red-600 mb-2.5" />
          <h1 className="text-xl text-center font-bold mb-3">Iniciar sesión</h1>
        </div>
        <input className="border-b-2 w-[92%] m-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input className="border-b-2 w-[92%] m-3"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-red-600 w-50 h-8 text-white font-medium py-2 mt-2" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* DIVISOR */}
      <div className="text-center text-sm text-gray-500">o</div>

      {/* GOOGLE */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-[94%] border ml-2 mr-2 py-2 flex items-center justify-center gap-2 "
      >
        <FaGoogle className="w-5 h-5 text-red-700" /><h1 className="text-red-600 font-semibold">Continuar con Google</h1>
      </button>
    </div >
  )
}
