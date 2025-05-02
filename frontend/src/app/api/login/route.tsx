import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (contentType !== 'application/json') {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    const body = await request.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const apiUrl = `${process.env.API_URL}/auth/login`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || 'Authentication failed',
          details: errorData.details || null,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const token = data.token;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Invalid token received from authentication service' },
        { status: 500 }
      );
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    };

    const nextResponse = NextResponse.json(
      { success: true, user: data.user },
      { status: 200 }
    );

    nextResponse.cookies.set('authToken', token, cookieOptions);

    return nextResponse;
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
