'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { Post } from '@/types/content';

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    // 检查认证
    fetch('/api/admin/auth')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/admin/login');
          return;
        }
        fetchPosts();
      });
  }, [router]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`确定要删除文章 "${title}" 吗？`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.slug !== slug));
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('删除失败');
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.published !== false;
    if (filter === 'draft') return post.published === false;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
        >
          新建文章
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          全部 ({posts.length})
        </FilterButton>
        <FilterButton active={filter === 'published'} onClick={() => setFilter('published')}>
          已发布 ({posts.filter(p => p.published !== false).length})
        </FilterButton>
        <FilterButton active={filter === 'draft'} onClick={() => setFilter('draft')}>
          草稿 ({posts.filter(p => p.published === false).length})
        </FilterButton>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            暂无文章
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  发布日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map(post => (
                <tr key={post.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-purple-600"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">{post.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {format(new Date(post.date), 'yyyy-MM-dd', { locale: zhCN })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.published === false ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800">
                        草稿
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800">
                        已发布
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="text-purple-600 hover:text-purple-900 mr-4"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug, post.title)}
                      className="text-red-600 hover:text-red-900"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        active
          ? 'bg-purple-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
