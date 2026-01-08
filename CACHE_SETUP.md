# Sistema de Caché con Upstash Redis

## 📋 Configuración Inicial

### 1. Variables de Entorno
Completa las credenciales en el archivo `.env.local`:

```env
# Upstash Redis (obtén estas credenciales desde tu dashboard de Upstash)
UPSTASH_REDIS_REST_URL=https://your-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here

# Clave secreta para proteger las APIs de caché (elige una clave segura)
CACHE_SECRET_KEY=mi_clave_secreta_super_segura
```

### 2. Obtener Credenciales de Upstash
1. Ve a [https://console.upstash.com/](https://console.upstash.com/)
2. Crea una base de datos Redis (o usa la existente)
3. En el dashboard, selecciona tu base de datos
4. Copia el **REST URL** y el **REST TOKEN**
5. Pégalos en el archivo `.env.local`

---

## 🚀 Cómo Funciona

### Flujo de Caché
```
Usuario solicita datos
    ↓
¿Están en Redis? → SÍ → Devuelve desde caché (rápido ⚡)
    ↓ NO
Lee desde Firebase
    ↓
Guarda en Redis con TTL
    ↓
Devuelve datos
```

### Tiempos de Expiración (TTL)
- **Sliders**: 24 horas (cambian raramente)
- **Marcas**: 24 horas (cambian raramente)
- **Productos**: 1 hora (pueden cambiar precios/stock)
- **Categorías**: 12 horas (estructura estable)

---

## 📊 Funciones Disponibles

### En `lib/firebase-cache.js`

```javascript
// Obtener sliders
import { getSliders } from '@/lib/firebase-cache';
const images = await getSliders();

// Obtener marcas
import { getMarcas } from '@/lib/firebase-cache';
const brands = await getMarcas();

// Obtener productos (todos o por categoría)
import { getProductos } from '@/lib/firebase-cache';
const productos = await getProductos(); // Todos
const productosDrogeria = await getProductos('drogeria'); // Por categoría

// Obtener productos recomendados
import { getProductosRecomendados } from '@/lib/firebase-cache';
const recomendados = await getProductosRecomendados(10); // Límite de 10

// Obtener productos más buscados
import { getProductosBuscados } from '@/lib/firebase-cache';
const buscados = await getProductosBuscados(10);

// Obtener ofertas
import { getOfertas } from '@/lib/firebase-cache';
const ofertas = await getOfertas(10);
```

---

## 🔄 Invalidar Caché

Cuando actualices datos en Firebase, debes invalidar el caché para que se reflejen los cambios.

### Opción 1: Via API (Recomendado)

Usa Postman, cURL, o cualquier cliente HTTP:

```bash
# Invalidar sliders
curl -X POST http://localhost:3000/api/cache/revalidate \
  -H "Content-Type: application/json" \
  -d '{"collection": "sliders", "secret": "tu_clave_secreta"}'

# Invalidar marcas
curl -X POST http://localhost:3000/api/cache/revalidate \
  -H "Content-Type: application/json" \
  -d '{"collection": "marcas", "secret": "tu_clave_secreta"}'

# Invalidar productos
curl -X POST http://localhost:3000/api/cache/revalidate \
  -H "Content-Type: application/json" \
  -d '{"collection": "productos", "secret": "tu_clave_secreta"}'

# Invalidar TODO el caché
curl -X POST http://localhost:3000/api/cache/revalidate \
  -H "Content-Type: application/json" \
  -d '{"collection": "all", "secret": "tu_clave_secreta"}'
```

### Opción 2: Limpiar Todo el Caché

```bash
curl -X POST http://localhost:3000/api/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"secret": "tu_clave_secreta"}'
```

### Opción 3: Desde el Código

```javascript
import { deleteCache, deleteCachePattern } from '@/lib/cache';

// Eliminar caché específico
await deleteCache('sliders');

// Eliminar todos los productos
await deleteCachePattern('productos:*');
```

---

## 📈 Beneficios

### Antes (Sin Caché)
- Cada usuario genera lecturas a Firebase
- 100 usuarios = 100 lecturas por componente
- Riesgo de superar límite gratuito (50K lecturas/día)

### Después (Con Caché)
- Primera lectura → Firebase + guarda en Redis
- Siguientes lecturas → Solo desde Redis (no cuenta en Firebase)
- 100 usuarios = 1 lectura a Firebase (las otras 99 desde caché)
- **Reducción del ~95% de lecturas a Firebase**

### Performance
- Firebase: ~300-500ms
- Redis: ~20-50ms
- **Mejora de velocidad de 6-10x**

---

## 🛠️ Troubleshooting

### Error: "Cannot connect to Redis"
- Verifica que las credenciales en `.env.local` sean correctas
- Asegúrate de que tu base de datos Upstash esté activa
- Reinicia el servidor de desarrollo: `npm run dev`

### Los datos no se actualizan
- El caché tiene un TTL, espera a que expire O
- Invalida manualmente el caché usando las APIs

### Error: "No autorizado" en APIs
- Verifica que el `secret` en el body coincida con `CACHE_SECRET_KEY` en `.env.local`

---

## 📝 Próximos Pasos

Para implementar productos dinámicos:

1. Crea una colección `productos` en Firebase con estructura:
```json
{
  "nombre": "Dolex Gripa",
  "categoria": "medicamentos",
  "precio": 18000,
  "imagen": "url_imagen",
  "recomendado": true,
  "masBuscado": false,
  "oferta": false,
  "descuento": 0
}
```

2. Usa las funciones de caché en tus componentes:
```javascript
// En un Server Component
import { getProductosRecomendados } from '@/lib/firebase-cache';

export default async function RecomendadosPage() {
  const productos = await getProductosRecomendados(10);
  
  return (
    <div>
      {productos.map(prod => (
        <Carproducto key={prod.id} producto={prod} />
      ))}
    </div>
  );
}
```

---

## 📊 Monitoreo

Para ver si el caché está funcionando, revisa la consola del servidor:

```
✅ Sliders obtenidos desde caché
🔥 Obteniendo productos desde Firebase...
Caché guardado para productos:recomendados:10 con TTL de 3600s
```

- ✅ = Datos servidos desde caché (sin lectura a Firebase)
- 🔥 = Datos obtenidos desde Firebase (nueva lectura)

---

## 🔐 Seguridad

- **NUNCA** compartas tu `CACHE_SECRET_KEY` públicamente
- **NUNCA** subas el archivo `.env.local` a Git (ya está en `.gitignore`)
- Las APIs de caché están protegidas con autenticación por secret key
