import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const id = url.pathname.split('/').slice(-2, -1)[0];
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!id) {
      return NextResponse.json(
        { error: 'Frase ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { comentario, gif } = body;

    if (!comentario && !gif) {
      return NextResponse.json(
        { error: 'Either comment or gif must be provided' },
        { status: 400 }
      );
    }

    const apiUrl = `${process.env.API_URL}/frases/${id}/addComment`;

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: 'Failed to add comment',
          details: errorData.error || res.statusText,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
