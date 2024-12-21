import { NextRequest, NextResponse } from 'next/server';

const baseUrl = `${process.env.API_URL}/frases`;

export async function GET(request: NextRequest) {
  try {
    if (!baseUrl) {
      return NextResponse.json(
        { error: 'API URL not defined' },
        { status: 500 }
      );
    }

    // Obtener los parámetros de búsqueda de la URL
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '25';

    // Construir la URL con los parámetros de paginación
    const url = new URL(baseUrl);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    // Realizar la petición a la API
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();

    // Asegurarse de que la respuesta incluya la información de paginación
    return NextResponse.json(
      {
        docs: data.docs || data, // Por si la API devuelve directamente el array
        page: parseInt(page),
        hasNextPage: data.hasNextPage ?? data.docs?.length === parseInt(limit),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
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
    if (!baseUrl) {
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

    const res = await fetch(baseUrl, {
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
