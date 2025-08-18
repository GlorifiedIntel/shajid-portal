// middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If not signed in, redirect is already handled by withAuth "pages.signIn"
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If user tries to access /admin but isn't an admin → redirect to /dashboard
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/sign-in', // where unauthenticated users go
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
