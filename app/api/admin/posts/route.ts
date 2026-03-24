// 文章CRUD API

import { NextRequest, NextResponse } from 'next/server';
import { getAllPostsWithDrafts, createPost } from '@/lib/content';
import { isAuthenticated } from '@/lib/admin/auth';

// GET - 获取所有文章（包括草稿）
export async function GET(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const posts = await getAllPostsWithDrafts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 });
  }
}

// POST - 创建文章
export async function POST(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, content, date, tags, category, platform, externalUrl, coverImage, published } = body;

    // 验证必填字段
    if (!title || !description || !content) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    const post = await createPost({
      title,
      description,
      content,
      date: date || new Date().toISOString(),
      tags: tags || [],
      category: category || '未分类',
      platform: platform || 'website',
      externalUrl,
      coverImage,
      published: published !== false,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    const message = error instanceof Error ? error.message : '创建文章失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
