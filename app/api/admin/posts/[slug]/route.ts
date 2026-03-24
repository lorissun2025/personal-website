// 单个文章操作API

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, updatePost, deletePost } from '@/lib/content';
import { isAuthenticated } from '@/lib/admin/auth';

// GET - 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 });
  }
}

// PUT - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const { title, description, content, date, tags, category, platform, externalUrl, coverImage, published } = body;

    // 验证必填字段
    if (!title || !description || !content) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    const post = await updatePost(slug, {
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

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Update post error:', error);
    const message = error instanceof Error ? error.message : '更新文章失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { slug } = await params;
    await deletePost(slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    const message = error instanceof Error ? error.message : '删除文章失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
