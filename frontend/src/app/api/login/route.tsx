import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiUrl = `${process.env.API_URL}/auth/login`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Error en la autenticación' },
        { status: response.status }
      );
    }

    const token = data.token;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 días en segundos
    };

    const nextResponse = NextResponse.json({ success: true }, { status: 200 });

    nextResponse.cookies.set('token', token, cookieOptions);

    return nextResponse;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
