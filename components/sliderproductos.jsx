"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Carproducto from "./carproducto";

export default function SliderProductos({ productos }) {
  const scrollRef = useRef(null);
  const [pagina, setPagina] = useState(0);
  const [cardsPorVista, setCardsPorVista] = useState(2);

  // 🔹 Calcular cards por vista (responsive)
  const calcularCards = useCallback(() => {
    const ancho = window.innerWidth;
    if (ancho >= 1280) setCardsPorVista(4);
    else if (ancho >= 768) setCardsPorVista(3);
    else setCardsPorVista(2);
  }, []);

  useEffect(() => {
    calcularCards();

    const onResize = () => calcularCards();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calcularCards]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / productos.length;
    const scrollStep = cardWidth * cardsPorVista;

    const maxPage = Math.ceil(productos.length / cardsPorVista) - 1;
    const nuevaPagina = dir === "left" ? pagina - 1 : pagina + 1;

    if (nuevaPagina < 0 || nuevaPagina > maxPage) return;

    setPagina(nuevaPagina);
    container.scrollBy({
      left: dir === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    });
  };

  const totalPaginas = Math.ceil(productos.length / cardsPorVista);

  if (!productos.length) return null;

  return (
    <div className="w-full px-2">
      <div className="relative overflow-hidden">

        {/* Flecha izquierda */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-2 rounded-full"
        >
          <MdKeyboardArrowLeft size={26} />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-2 rounded-full"
        >
          <MdKeyboardArrowRight size={26} />
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-hidden scroll-smooth"
        >
          {productos.map((producto) => (
            <Carproducto key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}
