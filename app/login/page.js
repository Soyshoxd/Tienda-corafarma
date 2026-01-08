"use client"

import { useState } from "react"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"

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
      <form onSubmit={handleLogin}>
        <h1 className="text-xl mb-4">Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* DIVISOR */}
      <div className="text-center text-sm text-gray-500">o</div>

      {/* GOOGLE */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border py-2 flex items-center justify-center gap-2"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        Continuar con Google
      </button>
    </div>
  )
}
