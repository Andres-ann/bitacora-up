import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Token requerido' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    const formData = await request.formData();
    const file = formData.get('avatar') as Blob;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Imagen e ID de usuario requeridos' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const backendFormData = new FormData();
    backendFormData.append(
      'avatar',
      new Blob([fileBuffer], { type: file.type }),
      'avatar.jpg'
    );

    const response = await fetch(
      `${process.env.API_URL}/profile/updateAvatar/${userId}`,
      {
        method: 'POST',
        body: backendFormData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Avatar actualizado',
      user: data.user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al actualizar el avatar', details: error.message },
      { status: 500 }
    );
  }
}
