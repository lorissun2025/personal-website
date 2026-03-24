// 管理后台认证API

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyPassword,
  createSession,
  setSessionCookie,
  getSession,
  deleteSession,
  deleteSessionCookie,
  isAuthenticated,
} from '@/lib/admin/auth';
import type { AuthResponse } from '@/types/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, password } = body;

    // 登录
    if (action === 'login') {
      if (!password) {
        return NextResponse.json<AuthResponse>({
          success: false,
          message: '请提供密码',
        }, { status: 400 });
      }

      const isValid = await verifyPassword(password);

      if (!isValid) {
        return NextResponse.json<AuthResponse>({
          success: false,
          message: '密码错误',
        }, { status: 401 });
      }

      const session = createSession();
      await setSessionCookie(session);

      return NextResponse.json<AuthResponse>({
        success: true,
        token: session.token,
      });
    }

    // 登出
    if (action === 'logout') {
      const token = (await cookies()).get('admin_session')?.value;
      if (token) {
        deleteSession(token);
      }
      await deleteSessionCookie();

      return NextResponse.json<AuthResponse>({
        success: true,
        message: '已登出',
      });
    }

    return NextResponse.json<AuthResponse>({
      success: false,
      message: '无效的操作',
    }, { status: 400 });

  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json<AuthResponse>({
      success: false,
      message: '服务器错误',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    return NextResponse.json({
      success: true,
      authenticated,
    });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json({
      success: false,
      authenticated: false,
    }, { status: 500 });
  }
}
