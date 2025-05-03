import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Token no encontrado' },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, secret) as { id: string };
    const userId = decodedToken.id;

    const apiUrl = `${process.env.API_URL}/profile/${userId}`;

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Error al obtener datos del usuario: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    if (!data.user) {
      return NextResponse.json(
        { error: 'Datos del usuario no encontrados' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: data.user.id,
          name: data.user.name,
          username: data.user.username,
          avatar: data.user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en /profile:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
