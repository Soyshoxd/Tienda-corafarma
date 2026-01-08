import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { getCache, setCache, CACHE_TTL } from './cache';

/**
 * Obtiene sliders desde caché o Firebase
 * @returns {Promise<string[]>} - Array de URLs de imágenes
 */
export async function getSliders() {
  const cacheKey = 'sliders';
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Sliders obtenidos desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo sliders desde Firebase...');
  const snapshot = await getDocs(collection(db, 'sliders'));
  const urls = snapshot.docs.map(doc => doc.data().url);
  
  // Guardar en caché
  await setCache(cacheKey, urls, CACHE_TTL.SLIDERS);
  
  return urls;
}

/**
 * Obtiene marcas desde caché o Firebase
 * @returns {Promise<string[]>} - Array de URLs de imágenes
 */
export async function getMarcas() {
  const cacheKey = 'marcas';
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Marcas obtenidas desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo marcas desde Firebase...');
  const snapshot = await getDocs(collection(db, 'marcas'));
  const urls = snapshot.docs.map(doc => doc.data().url);
  
  // Guardar en caché
  await setCache(cacheKey, urls, CACHE_TTL.MARCAS);
  
  return urls;
}

/**
 * Obtiene productos desde caché o Firebase
 */
export async function getProductos({ categoriaId = null, subcategoriaId = null } = {}) {
  const cacheKey = subcategoriaId
    ? `productos:${categoriaId}:${subcategoriaId}`
    : categoriaId
      ? `productos:${categoriaId}`
      : 'productos:all'

  const cached = await getCache(cacheKey)
  if (cached) {
    console.log('✅ Productos obtenidas desde caché');
    return cached;
  }

  console.log('🔥 Obteniendo productos desde Firebase...');
  const snapshot = await getDocs(collection(db, 'productos'))

  let productos = snapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toMillis?.() ?? null
    }
  })

  if (categoriaId) {
    productos = productos.filter(p => p.categoriaId === categoriaId)
  }

  if (subcategoriaId) {
    productos = productos.filter(p => p.subcategoriaId === subcategoriaId)
  }

  await setCache(cacheKey, productos, CACHE_TTL.PRODUCTOS)
  return productos
}

/**
 * Obtiene categorías desde caché o Firebase
 * @returns {Promise<Array>} - Array de categorías
 */
export async function getCategorias() {
  const cacheKey = 'categorias';
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Categorías obtenidas desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo categorías desde Firebase...');
  const snapshot = await getDocs(collection(db, 'categorias'));
  const categorias = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt
        ? doc.data().createdAt.toMillis()
        : null
  }));
  
  // Guardar en caché
  await setCache(cacheKey, categorias, CACHE_TTL.CATEGORIAS);
  
  return categorias;
}

/**
 * Obtiene productos recomendados desde caché o Firebase
 * @param {number} limit - Número máximo de productos
 * @returns {Promise<Array>} - Array de productos recomendados
 */
export async function getProductosRecomendados(limit = 10) {
  const cacheKey = `productos:recomendados:${limit}`;
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Productos recomendados obtenidos desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo productos recomendados desde Firebase...');
  const snapshot = await getDocs(collection(db, 'productos'));
  const productos = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(p => p.recomendado === true)
    .slice(0, limit);
  
  // Guardar en caché
  await setCache(cacheKey, productos, CACHE_TTL.PRODUCTOS);
  
  return productos;
}

/**
 * Obtiene productos más buscados desde caché o Firebase
 * @param {number} limit - Número máximo de productos
 * @returns {Promise<Array>} - Array de productos más buscados
 */
export async function getProductosBuscados(limit = 10) {
  const cacheKey = `productos:buscados:${limit}`;
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Productos más buscados obtenidos desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo productos más buscados desde Firebase...');
  const snapshot = await getDocs(collection(db, 'productos'));
  const productos = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(p => p.masBuscado === true)
    .slice(0, limit);
  
  // Guardar en caché
  await setCache(cacheKey, productos, CACHE_TTL.PRODUCTOS);
  
  return productos;
}

/**
 * Obtiene ofertas desde caché o Firebase
 * @param {number} limit - Número máximo de ofertas
 * @returns {Promise<Array>} - Array de productos en oferta
 */
export async function getOfertas(limit = 10) {
  const cacheKey = `productos:ofertas:${limit}`;
  
  // Intentar obtener desde caché
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log('✅ Ofertas obtenidas desde caché');
    return cached;
  }
  
  // Si no está en caché, obtener desde Firebase
  console.log('🔥 Obteniendo ofertas desde Firebase...');
  const snapshot = await getDocs(collection(db, 'productos'));
  const productos = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(p => p.oferta === true || p.descuento > 0)
    .slice(0, limit);
  
  // Guardar en caché
  await setCache(cacheKey, productos, CACHE_TTL.PRODUCTOS);
  
  return productos;
}
