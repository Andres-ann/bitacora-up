import { NextResponse } from 'next/server';

const baseUrl = `${process.env.API_URL}/frases`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json({ docs: data });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching post' },
      { status: 500 }
    );
  }
}
