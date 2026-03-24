// 单个工具操作API

import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug, updateTool, deleteTool } from '@/lib/content';
import { isAuthenticated } from '@/lib/admin/auth';

// GET - 获取单个工具
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
    const tool = await getToolBySlug(slug);

    if (!tool) {
      return NextResponse.json({ error: '工具不存在' }, { status: 404 });
    }

    return NextResponse.json({ tool });
  } catch (error) {
    console.error('Get tool error:', error);
    return NextResponse.json({ error: '获取工具失败' }, { status: 500 });
  }
}

// PUT - 更新工具
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
    const { name, icon, description, longDescription, category, tags, officialUrl, tutorialUrl, featured } = body;

    // 验证必填字段
    if (!name || !icon || !description || !category) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    const tool = await updateTool(slug, {
      name,
      icon,
      description,
      longDescription,
      category,
      tags: tags || [],
      officialUrl,
      tutorialUrl,
      featured: featured || false,
    });

    return NextResponse.json({ tool });
  } catch (error) {
    console.error('Update tool error:', error);
    const message = error instanceof Error ? error.message : '更新工具失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - 删除工具
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
    await deleteTool(slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete tool error:', error);
    const message = error instanceof Error ? error.message : '删除工具失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
