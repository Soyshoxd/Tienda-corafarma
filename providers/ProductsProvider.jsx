"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import Fuse from "fuse.js"
import { getProductos } from "@/lib/firebase-cache"

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  fetch("/api/productos")
    .then(res => res.json())
    .then(data => setProductos(data))
}, [])

  const fuse = useMemo(() => {
    if (!productos.length) return null

    return new Fuse(productos, {
      keys: [
        { name: "nombre", weight: 0.6 },
        { name: "marca", weight: 0.25 },
        { name: "principioActivo", weight: 0.15 }
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2
    })
  }, [productos])

  return (
    <ProductsContext.Provider value={{ productos, fuse, loading }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
