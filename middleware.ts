import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser, isUserType } from './app/lib/supabase/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const pathname = request.nextUrl.pathname;

  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.redirect(new URL('/pages/public/signin', request.url));
  }

  // Check route types
  const isPartnerRoute = pathname.startsWith('/pages/private/business');
  const isClientRoute = pathname.startsWith('/pages/private/client');

  const isPartner = await isUserType(['staff', 'business_owner']);
  if (isPartnerRoute) {
    if (!isPartner) {
      return NextResponse.redirect(new URL('/pages/unauthorized', request.url));
    }
    return res;
  }

  const isClient = await isUserType(['client']);

  if (isClientRoute) {
    if (!isClient) {
      return NextResponse.redirect(new URL('/pages/unauthorized', request.url));
    }
    return res;
  }

  return res;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/pages/private/business/:path*',
    '/pages/private/client/:path*'
  ],
}; 