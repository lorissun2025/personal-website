'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PostEditor } from '@/components/admin/PostEditor';
import type { Post } from '@/types/content';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        alert('文章不存在');
        router.push('/admin/posts');
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      alert('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedPost: Omit<Post, 'slug' | 'readingTime'>) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/posts/${params.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.post.slug !== params.slug) {
          router.push(`/admin/posts/${data.post.slug}`);
        } else {
          router.refresh();
        }
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

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  if (!post) {
    return <div className="text-center py-12">文章不存在</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">编辑文章</h1>
      <PostEditor
        post={post}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
