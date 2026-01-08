import { getCategorias } from '@/lib/firebase-cache';
import CategoriasClient from './categorias-client';
export default async function Categorias() {
  const categorias = await getCategorias();
  return<CategoriasClient categorias={categorias} />
  
}