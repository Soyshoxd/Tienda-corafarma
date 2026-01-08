import { NextResponse } from 'next/server';
import { clearAllCache } from '@/lib/cache';
import { revalidatePath } from 'next/cache';

/**
 * API para limpiar todo el caché de Redis
 * 
 * Uso:
 * POST /api/cache/clear
 * Body: { "secret": "tu_secret_key" }
 * 
 * ADVERTENCIA: Esto eliminará TODOS los datos del caché
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { secret } = body;

    // Verificar secret key para proteger el endpoint
    if (secret !== process.env.CACHE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Limpiar todo el caché
    await clearAllCache();
    
    // Revalidar todas las rutas
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Todo el caché ha sido limpiado correctamente',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error limpiando caché:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET para verificar el estado del endpoint (opcional)
 */
export async function GET() {
  return NextResponse.json({
    message: 'API de limpieza de caché activa',
    method: 'POST',
    requiredBody: {
      secret: 'string'
    }
  });
}
