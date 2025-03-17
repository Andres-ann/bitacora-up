import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, username, password, avatar } = await request.json();

    if (!name || !username || !password || !avatar) {
      return NextResponse.json(
        { error: 'Name, username, password, and avatar are required' },
        { status: 400 }
      );
    }

    const apiUrl = `${process.env.API_URL}/auth/register`;

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password, avatar }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to register: ${errorData.error || res.statusText}`
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
