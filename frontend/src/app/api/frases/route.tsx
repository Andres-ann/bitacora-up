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
    const { id } = await request.json(); // Extrae el ID de la frase
    if (!id) {
      return NextResponse.json(
        { error: 'Frase ID is required' },
        { status: 400 }
      );
    }

    const likeurl = `${url}/${id}/addlike`; // Endpoint del backend
    const res = await fetch(likeurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
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
