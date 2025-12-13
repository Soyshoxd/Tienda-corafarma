import React from 'react'
import Link from 'next/link'
const Maps = () => {
    return (
        <div className='flex gap-1 flex-col'>
            <h1 className='text-center text-2xl font-bold text-red-600 m-2'>Encuentranos aquí</h1>
            <div className='m-2.5 h-70'>
                <iframe
                    title="Ubicación Drogueria Corafarma"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.108755194529!2d-74.0231687898306!3d4.921466195033867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4077863e73add9%3A0x7acc6d698f6c3812!2sDroguer%C3%ADa%20Corafarma!5e0!3m2!1ses-419!2sco!4v1763252776581!5m2!1ses-419!2sco"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow"
                />
            </div>
            <div className='m-3'>
                <p>Al visitarnos, encontrarás un equipo
                    comprometido con tu cuidado, dispuesto a orientarte con calidez y responsabilidad. No importa si necesitas un medicamento de uso diario, un producto de cuidado personal o simplemente un consejo para sentirte mejor: aquí siempre tendrás atención personalizado visitarnos, encontrarás un equipo comprometido con tu cuidado.</p>
                <div>
                    <Link
                        href="https://maps.app.goo.gl/1oFtuLf4sXS6zhBW7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow transition duration-200 text-[18px] md:text-base p-1 w-full text-center">
                        Ver en Google Maps
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Maps
