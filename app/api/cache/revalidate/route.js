import { NextResponse } from 'next/server';
import { deleteCache, deleteCachePattern } from '@/lib/cache';
import { revalidatePath } from 'next/cache';

/* 🔐 Orígenes permitidos */
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://tu-admin.vercel.app', // cambia cuando lo subas
];

/* 🧩 Headers CORS */
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/* 🟡 PRE-FLIGHT (OBLIGATORIO) */
export async function OPTIONS(request) {
  const origin = request.headers.get('origin');

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/**
 * POST /api/cache/revalidate
 * Body:
 * {
 *   collection: "sliders" | "marcas" | "productos" | "categorias" | "all",
 *   secret: "CACHE_SECRET_KEY"
 * }
 */
export async function POST(request) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    const { collection, secret } = await request.json();

    /* 🔐 Validación de seguridad */
    if (secret !== process.env.CACHE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401, headers }
      );
    }

    if (!collection) {
      return NextResponse.json(
        { error: 'Se requiere el parámetro "collection"' },
        { status: 400, headers }
      );
    }

    /* ♻️ Invalidación */
    switch (collection) {
      case 'sliders':
        await deleteCache('sliders');
        revalidatePath('/');
        break;

      case 'marcas':
        await deleteCache('marcas');
        revalidatePath('/');
        break;

      case 'productos':
        await deleteCachePattern('productos:*');
        revalidatePath('/');
        revalidatePath('/prodt');
        break;

      case 'categorias':
        await deleteCache('categorias');
        revalidatePath('/');
        break;

      case 'all':
        await deleteCachePattern('*');
        revalidatePath('/', 'layout');
        break;

      default:
        return NextResponse.json(
          { error: 'Colección no válida' },
          { status: 400, headers }
        );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Caché de "${collection}" invalidado correctamente`,
        timestamp: new Date().toISOString(),
      },
      { headers }
    );

  } catch (error) {
    console.error('Error revalidando caché:', error);

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500, headers }
    );
  }
}
