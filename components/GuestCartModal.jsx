"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

export default function GuestCartModal() {
    const { showGuestNotice, setShowGuestNotice } = useCart()
    const router = useRouter()

    if (!showGuestNotice) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-2">
                    Tu carrito es temporal
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Inicia sesión para guardar tu carrito y continuar luego.
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setShowGuestNotice(false)
                            router.push("/login")
                        }}
                        className="flex-1 bg-red-700 text-white py-2 rounded"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={() => {
                            localStorage.setItem("guest_notice_dismissed", "true")
                            setShowGuestNotice(false)
                        }}
                        className="flex-1 border py-2 rounded"
                    >
                        Seguir como invitado
                    </button>
                </div>
            </div>
        </div>
    )
}
