import { NextResponse } from 'next/server';

export function middleware(req) {
  const userId = req.cookies.get('user_id')?.value;
  console.log("Middleware userId : ", userId)
  const protectedPath = req.nextUrl.pathname.startsWith('/dashboard');

  if (protectedPath && !userId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};


