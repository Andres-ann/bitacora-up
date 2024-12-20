import { NextResponse } from 'next/server';

const url = `${process.env.API_URL}/frases`;

export async function GET() {
  try {
    if (!url) {
      return NextResponse.json(
        { error: 'API URL not defined' },
        { status: 500 }
      );
    }

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const frases = await res.json();

    return NextResponse.json(frases, { status: 200 });
  } catch (error) {
    console.error('Request failed:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!url) {
      return NextResponse.json(
        { error: 'API URL not defined' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token missing' },
        { status: 401 }
      );
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
