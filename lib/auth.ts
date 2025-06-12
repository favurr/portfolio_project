// lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('Missing env: JWT_SECRET');

export function requireAuth(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    // No token → redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify token payload
    jwt.verify(token, JWT_SECRET);
    return null; // authorized
  } catch {
    // Invalid/expired → clear cookie and redirect
    const res = NextResponse.redirect(new URL('/admin/login', request.url));
    res.cookies.set('token', '', { maxAge: 0, path: '/' });
    return res;
  }
}