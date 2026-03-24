// 工具CRUD API

import { NextRequest, NextResponse } from 'next/server';
import { getAllTools, createTool } from '@/lib/content';
import { isAuthenticated } from '@/lib/admin/auth';

// GET - 获取所有工具
export async function GET(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const tools = await getAllTools();
    return NextResponse.json({ tools });
  } catch (error) {
    console.error('Get tools error:', error);
    return NextResponse.json({ error: '获取工具失败' }, { status: 500 });
  }
}

// POST - 创建工具
export async function POST(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { name, icon, description, longDescription, category, tags, officialUrl, tutorialUrl, featured } = body;

    // 验证必填字段
    if (!name || !icon || !description || !category) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    const tool = await createTool({
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

    return NextResponse.json({ tool }, { status: 201 });
  } catch (error) {
    console.error('Create tool error:', error);
    const message = error instanceof Error ? error.message : '创建工具失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
