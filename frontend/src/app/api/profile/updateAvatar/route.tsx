import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type debe ser multipart/form-data' },
        { status: 415 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar');
    const userId = formData.get('userId');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'Archivo de avatar inválido o faltante' },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'ID de usuario inválido o faltante' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Use JPEG, PNG o WebP' },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande (máx. 5MB)' },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append('avatar', file, 'avatar');

    const backendUrl = `${process.env.API_URL}/profile/updateAvatar/${userId}`;
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: backendFormData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || 'Error al actualizar el avatar',
          details: errorData.details,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Avatar actualizado correctamente',
      user: data.user,
    });
  } catch (error) {
    console.error('Error en PUT /api/profile/updateAvatar:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
