// 管理后台类型定义

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
}

export interface AdminSession {
  token: string;
  userId: string;
  expiresAt: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export interface MediaFile {
  filename: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

export interface SyncResult {
  success: boolean;
  platform: string;
  postId?: string;
  url?: string;
  message?: string;
}

export interface WeChatConfig {
  appId: string;
  appSecret: string;
}

export interface XiaohongshuConfig {
  accessToken: string;
}
