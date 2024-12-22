import { NextResponse } from 'next/server';

const baseUrl = `${process.env.API_URL}/random`;

export async function GET() {
  try {
    if (!baseUrl) {
      return NextResponse.json(
        { error: 'API URL not defined' },
        { status: 500 }
      );
    }

    const res = await fetch(baseUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const frase = await res.json(); // La API devuelve un solo objeto

    return NextResponse.json(frase, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Request failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
