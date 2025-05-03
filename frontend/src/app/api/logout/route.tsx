import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 201 });

  response.cookies.set('authToken', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}
