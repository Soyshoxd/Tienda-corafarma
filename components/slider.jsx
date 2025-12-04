'use client'

import { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // 1. Traer imágenes desde Firestore
  useEffect(() => {
    const fetchImages = async () => {
      const snapshot = await getDocs(collection(db, "sliders"));
      const urls = snapshot.docs.map(doc => doc.data().url);
      setImages(urls);
    };
    fetchImages();
  }, []);

  // 2. Movimiento automático
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const goLeft = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goRight = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0)
    return <p className="text-center mt-10">Cargando imágenes...</p>;

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden shadow-lg mt-12">

      {/* IMAGEN */}
      <img
        src={images[index]}
        alt="slider"
        className="w-full h-55 duration-500"
      />

      {/* BOTÓN IZQUIERDA */}
      <button
        onClick={goLeft}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
      >
        <MdKeyboardArrowLeft size={30} />
      </button>

      {/* BOTÓN DERECHA */}
      <button
        onClick={goRight}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
      >
        <MdKeyboardArrowRight size={30} />
      </button>

      {/* INDICADORES */}
      <div className="absolute bottom-3 flex w-full justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
