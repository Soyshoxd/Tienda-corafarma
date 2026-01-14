"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [showGuestNotice, setShowGuestNotice] = useState(false)

  // 🔄 Cargar carrito
  useEffect(() => {
    if (authLoading) return

    async function loadCart() {
      const guestCart =
        JSON.parse(localStorage.getItem("guest_cart")) || []

      if (user) {
        const ref = doc(db, "carts", user.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const dbCart = snap.data().items || []

          // 🔥 FUSIÓN REAL
          const merged = mergeCarts(guestCart, dbCart)

          setCart(merged)

          // Limpia carrito invitado
          localStorage.removeItem("guest_cart")

          // Guarda carrito fusionado
          await setDoc(ref, {
            items: merged,
            updatedAt: Date.now(),
          })
        } else {
          // No hay carrito en DB, usar el del invitado
          setCart(guestCart)

          if (guestCart.length > 0) {
            await setDoc(ref, {
              items: guestCart,
              updatedAt: Date.now(),
            })
            localStorage.removeItem("guest_cart")
          }
        }
      } else {
        // Invitado
        setCart(guestCart)
      }

      setLoading(false)
    }

    loadCart()
  }, [user, authLoading])


  // 💾 Guardar carrito
  useEffect(() => {
    if (loading) return

    if (user) {
      setDoc(doc(db, "carts", user.uid), {
        items: cart,
        updatedAt: Date.now(),
      })
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(cart))
    }
  }, [cart])


  // ➕ Agregar producto
  function addItem(product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })

    // ⚠️ Mostrar aviso solo si es invitado
    if (!user) {
      const dismissed = localStorage.getItem("guest_notice_dismissed")
      if (!dismissed) {
        setShowGuestNotice(true)
      }
    }
  }


  // ➖ Eliminar producto
  function removeItem(id) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  // 🧹 Vaciar carrito
  function clearCart() {
    setCart([])
  }

  function mergeCarts(localCart, dbCart) {
    const merged = [...dbCart]

    localCart.forEach((item) => {
      const existing = merged.find((p) => p.id === item.id)

      if (existing) {
        existing.quantity += item.quantity
      } else {
        merged.push(item)
      }
    })
    return merged
  }
  //actualizar cantidad 
  function updatedQuantity(id, quantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  //total de items
  const totalItems = cart.length
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        totalItems,
        clearCart,
        mergeCarts,
        updatedQuantity,
        isGuest: !user,
        showGuestNotice,
        setShowGuestNotice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
