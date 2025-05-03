import { NextResponse } from 'next/server';

const apiUrl = `${process.env.API_URL}/random`;

export async function GET() {
  try {
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API URL not defined' },
        { status: 500 }
      );
    }

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const frase = await res.json();

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
