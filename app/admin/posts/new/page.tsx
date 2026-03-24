'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/admin/PostEditor';
import type { Post } from '@/types/content';

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const initialPost: Omit<Post, 'slug' | 'readingTime'> = {
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString(),
    tags: [],
    category: '产品方法论',
    platform: 'website',
    published: true,
  };

  const handleSave = async (post: Omit<Post, 'slug' | 'readingTime'>) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/posts/${data.post.slug}`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || '保存失败');
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">新建文章</h1>
      <PostEditor
        post={initialPost}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
