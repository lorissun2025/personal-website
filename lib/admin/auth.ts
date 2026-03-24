// 管理后台认证逻辑

import { cookies } from 'next/headers';
import { compare, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import type { AdminSession, AuthResponse } from '@/types/admin';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7天

// 默认密码哈希 (密码: admin123)
// 生产环境应该从环境变量读取
const DEFAULT_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ||
  '$2a$10$rXjQZQqZQZQZQZQZQZQZQuR.5YmYmYmYmYmYmYmYmYmYmYmYmYmY';

// 简单的内存存储 (生产环境应使用数据库或Redis)
const sessions = new Map<string, AdminSession>();

export async function verifyPassword(password: string): Promise<boolean> {
  return await compare(password, DEFAULT_PASSWORD_HASH);
}

export function createSession(): AdminSession {
  const token = randomBytes(32).toString('hex');
  const session: AdminSession = {
    token,
    userId: 'admin',
    expiresAt: Date.now() + SESSION_DURATION,
  };

  sessions.set(token, session);

  // 清理过期会话
  cleanExpiredSessions();

  return session;
}

export function getSession(token: string): AdminSession | null {
  const session = sessions.get(token);

  if (!session) {
    return null;
  }

  // 检查是否过期
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

function cleanExpiredSessions(): void {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token);
    }
  }
}

export async function setSessionCookie(session: AdminSession): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie();
  if (!token) {
    return false;
  }

  const session = getSession(token);
  return !!session;
}

// 生成密码哈希（用于设置新密码）
export async function generatePasswordHash(password: string): Promise<string> {
  return await hash(password, 10);
}
