"use client"

import { useEffect, useRef, useState } from "react"
import { useProducts } from "@/providers/ProductsProvider"
import Link from "next/link"
import Image from "next/image"

export default function SearchBar() {
  const { fuse, loading } = useProducts()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!query || !fuse) {
      setResults([])
      return
    }

    const res = fuse.search(query, { limit: 6 })
    setResults(res.map(r => r.item))
  }, [query, fuse])

  // cerrar al hacer click afuera
  useEffect(() => {
    function handleClick(e) {
      if (!containerRef.current?.contains(e.target)) {
        setResults([])
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar medicamentos..."
        className="w-full rounded-full px-4 py-2 border focus:ring"
      />

      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden">
          {results.map(p => (
            <Link
              key={p.id}
              href={`/producto/${p.id}`}
              className="block px-4 py-3 hover:bg-gray-100"
            >
              <Image 
                src={p.imagen}
                alt={p.nombre}
                width={40}
                height={40}
                className="mr-2 inline-block"
              />
              <p className="font-medium">{p.nombre}</p>
              <p className="text-sm text-gray-500">{p.marca}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
