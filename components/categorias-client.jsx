'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoriasClient({ categorias }) {
  const sliderRef = useRef(null)
  const [showArrows, setShowArrows] = useState(false)

  // 🔹 SOLO categorías padre
  const categoriasPadre = categorias.filter(
    (categoria) => categoria.parentId === null
  )

  const checkOverflow = () => {
    if (!sliderRef.current) return
    const { scrollWidth, clientWidth } = sliderRef.current
    setShowArrows(scrollWidth > clientWidth)
  }

  const scroll = (direction) => {
    const amount = direction === 'left' ? -200 : 200
    sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [categoriasPadre])

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      {showArrows && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex items-center justify-center
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full bg-white shadow-md
            hover:bg-gray-100 transition"
        >
          ◀
        </button>
      )}

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-3 m-1 overflow-x-auto scrollbar-hide"
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY
        }}
      >
        {categoriasPadre.map((categoria) => (
          <Link
            key={categoria.id}
            href={`/categoria/${categoria.slug}`}
            className="flex items-center flex-col gap-2 min-w-[80px] shrink-0"
          >
            <div
              className="w-16 h-16 rounded-full border-2 border-black overflow-hidden relative
                hover:border-red-600 hover:shadow-2xl transition-all duration-300 group"
            >
              <Image
                src={categoria.icono}
                alt={categoria.nombre}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <p className="text-black font-semibold text-base text-center">
              {categoria.nombre}
            </p>
          </Link>
        ))}
      </div>

      {/* Flecha derecha */}
      {showArrows && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex items-center justify-center
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-8 h-8 rounded-full bg-white shadow-md
            hover:bg-gray-100 transition"
        >
          ▶
        </button>
      )}
    </div>
  )
}
