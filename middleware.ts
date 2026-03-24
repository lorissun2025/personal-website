import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是admin路由
  if (pathname.startsWith('/admin')) {
    // 登录页面不需要认证
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 检查session cookie
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      // 未登录，重定向到登录页
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
