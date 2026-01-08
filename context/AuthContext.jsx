"use client"
import { auth } from "@/lib/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"

//Creamos un contexto para la autenticación
const AuthContext = createContext()

//Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Escuchamos los cambios en el estado de autenticación
    //se ejecuta una vez cuando el componente se monta
    //firebase nos da el usuario autenticado o null si no hay usuario
    //guardamos el usuario en el estado y el loading en false para indicar que ya cargó
    //con unsubscribe nos devuelve una función para dejar de escuchar
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,(firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      })
      return () => unsubscribe();
    }, [])
    
  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  )
}
//funcion para facilitar el uso del contexto
export function useAuth() {
  return useContext(AuthContext)
}
