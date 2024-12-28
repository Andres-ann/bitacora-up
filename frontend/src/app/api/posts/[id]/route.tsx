import { NextResponse } from 'next/server';

const baseUrl = `${process.env.API_URL}/frases`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await fetch(`${baseUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!result.ok) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const post = await result.json();
    return NextResponse.json({ data: post });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching post' },
      { status: 500 }
    );
  }
}
