'use client'
import React, { useState } from 'react'


const Preguntas = () => {
     const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 my-6">
      
      {/* BOTÓN CERRADO */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-red-600 text-white py-4 px-6 rounded-full flex items-center justify-between text-xl font-semibold hover:bg-red-700 transition"
        >
          Preguntas frecuentes
          <span className="text-lg">▼</span>
        </button>
      )}

      {/* CONTENIDO DESPLEGADO */}
      {open && (
        <div className="bg-gradient-to-b from-red-600 to-red-700 text-white rounded-2xl p-6 space-y-6">
          
          {/* HEADER CLICKABLE */}
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-between text-left font-semibold text-xl"
          >
            Preguntas frecuentes
            <span className="text-lg">▲</span>
          </button>

          {/* FAQS */}
          <div className="space-y-4  leading-relaxed">
            <div>
              <p className="font-semibold text-md">
                ¿Los medicamentos son originales y seguros?
              </p>
              <p className="text-gray-200 mt-1 text-sm">
                Sí, todos nuestros productos provienen de proveedores autorizados y cumplen con las normas de calidad y seguridad.
              </p>
            </div>

            <div>
              <p className="font-semibold text-md">
                ¿Realizan domicilios?
              </p>
              <p className="text-gray-200 mt-1 text-sm">
                Si, ofrecemos servicio de domicilio en la ciudad y sus alrededores. Los costos y tiempos de entrega varían según la ubicación.
              </p>
            </div>

            <div>
              <p className="font-semibold text-md">
                ¿Qué hago si el medicamento que busco no está disponible?
              </p>
              <p className="text-gray-200 mt-1 text-sm">
                Puedes consultarnos y te informaremos sobre disponibilidad, pedidos especiales o alternativas equivalentes.
              </p>
            </div>
            <div>
              <p className="font-semibold text-md">
                ¿Los medicamentos son originales y seguros?
              </p>
              <p className="text-gray-200 mt-1 text-sm">
                Sí, todos nuestros productos provienen de proveedores autorizados y cumplen con las normas de calidad y seguridad.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Preguntas