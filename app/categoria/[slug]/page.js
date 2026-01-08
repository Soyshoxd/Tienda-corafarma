import Carproducto from "@/components/carproducto"
import Navbar from "@/components/navbar"
import { getCategorias, getProductos } from "@/lib/firebase-cache"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CategoriaPage({ params }) {
    const { slug } = await params

    const categorias = await getCategorias()

    const categoriaActual = categorias.find(
        c => c.slug === slug
    )

    if (!categoriaActual) {
        notFound()
    }

    const subcategorias = categorias.filter(
        c => c.parentId === categoriaActual.id
    )
    const productos = await getProductos({ categoriaId: slug })
    return (
        <div className="bg-gray-100 bg-cover bg-center bg-no-repeat bg-[url('/assets/fondo.png')] h-dvh">
            <Navbar />
            <div className="mt-21">
                <div className='ml-2 text-xs text-neutral-600'>
                    <h1>Inicio | Tienda | Licores</h1>
                </div>
                <div className="flex flex-col items-center p-4">
                    <h1 className="text-2xl text-red-600 font-bold">{categoriaActual.nombre}</h1>
                    <h1 className=''>
                        {categoriaActual.descripcion}
                    </h1>
                </div>

                {subcategorias.length > 0 && (
                    <div className="flex gap-4">
                        {subcategorias.map(sub => (
                            <div key={sub.id} className="flex flex-col items-center p-3">
                                <div
                                    className="w-16 h-16 rounded-full border-2 border-black overflow-hidden relative
                hover:border-red-600 hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <Image
                                        src={sub.icono}
                                        alt={sub.nombre}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                <p className="text-black font-semibold text-base text-center">
                                    {sub.nombre}
                                </p>
                            </div>
                        ))}
                    </div>
                )
                }
                {/* Productos */}

                {productos.length === 0 ? (
                    <div className="w-full p-3">
                        <p className="text-md font-bold">No hay productos disponibles en esta categoría.</p>
                        <Link href="/">
                        <button className='rounded-xs p-0.5 text-sm w-full flex items-center gap-2 justify-center bg-red-700 text-amber-100'>volver a la tienda</button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 m-1 place-items-center">
                    {
                    productos.map(producto => (
                        
                            <Carproducto
                            key={producto.id}
                                producto={producto}
                            />
                        
                    ))}
                    </div>)}

            </div>

        </div >

    )
}

