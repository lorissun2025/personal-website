// 媒体上传和管理API

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/admin/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'images');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// 确保上传目录存在
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// 生成唯一文件名
function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  const basename = path.basename(originalName, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
  return `${basename}-${timestamp}-${random}${ext}`;
}

// GET - 获取媒体列表
export async function GET(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    await ensureUploadDir();

    const fs = await import('fs/promises');
    const files = await fs.readdir(UPLOAD_DIR);

    const mediaFiles = files
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .map(f => ({
        filename: f,
        url: `/uploads/images/${f}`,
      }))
      .sort((a, b) => b.filename.localeCompare(a.filename));

    return NextResponse.json({ files: mediaFiles });
  } catch (error) {
    console.error('Get media error:', error);
    return NextResponse.json({ error: '获取媒体失败' }, { status: 500 });
  }
}

// POST - 上传文件
export async function POST(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '没有文件' }, { status: 400 });
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件类型，仅支持 JPG、PNG、WebP、GIF' },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `文件太大，最大支持 ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    await ensureUploadDir();

    const filename = generateFilename(file.name);
    const filepath = path.join(UPLOAD_DIR, filename);

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      file: {
        filename,
        url: `/uploads/images/${filename}`,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}

// DELETE - 删除文件
export async function DELETE(request: NextRequest) {
  try {
    // 验证认证
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: '缺少文件名' }, { status: 400 });
    }

    const filepath = path.join(UPLOAD_DIR, filename);

    // 安全检查：确保文件在上传目录内
    const resolvedPath = path.resolve(filepath);
    if (!resolvedPath.startsWith(path.resolve(UPLOAD_DIR))) {
      return NextResponse.json({ error: '无效的文件路径' }, { status: 400 });
    }

    const { unlink } = await import('fs/promises');
    await unlink(filepath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
