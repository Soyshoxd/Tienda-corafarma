import { Redis } from '@upstash/redis';

// Inicializar cliente de Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// TTL (Time To Live) en segundos
export const CACHE_TTL = {
  SLIDERS: 60 * 60 * 24, // 24 horas
  MARCAS: 60 * 60 * 24, // 24 horas
  PRODUCTOS: 60 * 60, // 1 hora
  CATEGORIAS: 60 * 60 * 12, // 12 horas
};

/**
 * Obtiene un valor del caché
 * @param {string} key - Clave del caché
 * @returns {Promise<any|null>} - Valor del caché o null si no existe
 */
export async function getCache(key) {
  try {
    const data = await redis.get(key);
    return data;
  } catch (error) {
    console.error(`Error obteniendo caché para ${key}:`, error);
    return null;
  }
}

/**
 * Guarda un valor en el caché con TTL
 * @param {string} key - Clave del caché
 * @param {any} value - Valor a guardar
 * @param {number} ttl - Tiempo de vida en segundos
 */
export async function setCache(key, value, ttl) {
  try {
    await redis.set(key, value, { ex: ttl });
    console.log(`Caché guardado para ${key} con TTL de ${ttl}s`);
  } catch (error) {
    console.error(`Error guardando caché para ${key}:`, error);
  }
}

/**
 * Elimina una clave del caché
 * @param {string} key - Clave a eliminar
 */
export async function deleteCache(key) {
  try {
    await redis.del(key);
    console.log(`Caché eliminado para ${key}`);
  } catch (error) {
    console.error(`Error eliminando caché para ${key}:`, error);
  }
}

/**
 * Elimina múltiples claves del caché por patrón
 * @param {string} pattern - Patrón de las claves (ej: "productos:*")
 */
export async function deleteCachePattern(pattern) {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`${keys.length} claves eliminadas con patrón ${pattern}`);
    }
  } catch (error) {
    console.error(`Error eliminando claves con patrón ${pattern}:`, error);
  }
}

/**
 * Limpia todo el caché
 */
export async function clearAllCache() {
  try {
    await redis.flushdb();
    console.log('Todo el caché ha sido limpiado');
  } catch (error) {
    console.error('Error limpiando todo el caché:', error);
  }
}

export default redis;
