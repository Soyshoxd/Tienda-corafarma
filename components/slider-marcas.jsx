'use client';
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";


export default function BrandSlider() {
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [translate, setTranslate] = useState(0);
    const [images, setImages] = useState([]);

  useEffect(() => {
      const fetchImages = async () => {
        const snapshot = await getDocs(collection(db, "marcas"));
        const urls = snapshot.docs.map(doc => doc.data().url);
        setImages(urls);
      };
      fetchImages();
    }, []);

  // --- AUTOMATIC MOVEMENT ---
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTranslate((prev) => prev - 1); 
    }, 20); // velocidad

    return () => clearInterval(interval);
  }, [paused]);

  // --- RESET WHEN IT GOES TOO FAR ---
  useEffect(() => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.scrollWidth / 2;
    if (Math.abs(translate) >= width) {
      setTranslate(0);
    }
  }, [translate]);

  // --- TOUCH CONTROL FOR MOBILE ---
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e) => {
    const moveX = e.touches[0].clientX;
    const diff = moveX - startX;
    setTranslate((prev) => prev + diff * 0.5);
    startX = moveX;
  };

  const handleTouchEnd = () => {
    setPaused(false);
  };

  return (
    <div
      className="overflow-hidden w-full bg-white py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider */}
      <div
        ref={sliderRef}
        className={`slider-track ${paused ? "paused" : ""}`}
      >
        {/* Duplicamos para que el loop sea infinito */}
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition"
          />
        ))}
      </div>
      <style jsx>{`
        .slider-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: scroll 15s linear infinite;
          white-space: nowrap;
          align-items: center;
        }

        .paused {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
