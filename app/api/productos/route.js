import { NextResponse } from "next/server"
import { getProductos } from "@/lib/firebase-cache"

export async function GET() {
  const productos = await getProductos()
  return NextResponse.json(productos)
}
