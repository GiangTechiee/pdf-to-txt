import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Note: Cannot import from @/config/env in middleware (Edge runtime limitation)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token');

  // If user is logged in and tries to access login page, redirect to dashboard
  if (pathname === '/login' && token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token.value, secret);
      console.log('✅ User already logged in, redirecting to dashboard');
      return NextResponse.redirect(new URL('/recruiter/generate', request.url));
    } catch (error) {
      // Invalid token, allow access to login page
      console.log('⚠️ Invalid token, allowing login page access');
    }
  }

  // Protected routes
  if (pathname.startsWith('/recruiter')) {
    console.log('🔍 Middleware check:', {
      pathname,
      hasToken: !!token,
      tokenValue: token?.value ? 'exists' : 'missing',
      JWT_SECRET_exists: !!JWT_SECRET,
    });

    if (!token) {
      console.log('❌ No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token using jose (Edge runtime compatible)
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token.value, secret);
      console.log('✅ Token verified successfully:', payload);
      return NextResponse.next();
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/recruiter/:path*', '/login'],
};
