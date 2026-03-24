// 内容类型定义

export interface Tool {
  slug: string;
  name: string;
  icon: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  officialUrl?: string;
  tutorialUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  category: string;
  platform: 'wechat' | 'xiaohongshu' | 'twitter' | 'tiktok' | 'website';
  externalUrl?: string;
  coverImage?: string;
  readingTime?: number;
  published?: boolean;
}

export interface ToolFrontmatter {
  name: string;
  icon: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  officialUrl?: string;
  tutorialUrl?: string;
  featured?: boolean;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  platform: 'wechat' | 'xiaohongshu' | 'twitter' | 'tiktok' | 'website';
  externalUrl?: string;
  coverImage?: string;
  published?: boolean;
}

export type PlatformType = 'wechat' | 'xiaohongshu' | 'twitter' | 'tiktok' | 'website';

export interface PlatformConfig {
  name: string;
  icon: string;
  color: string;
}
