'use client';

import { useState, useEffect } from 'react';
import { Tool, Post } from '@/types/content';
import ToolCard from '@/components/ToolCard';
import PostCard from '@/components/PostCard';

// 搜索结果组件
function SearchResults({ tools, posts, query }: { tools: Tool[], posts: Post[], query: string }) {
  if (!query) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-gray-500 text-lg">输入关键词开始搜索</p>
      </div>
    );
  }

  if (tools.length === 0 && posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">没有找到相关内容</p>
        <p className="text-gray-400 text-sm mt-2">试试其他关键词</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {tools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-lg text-sm">
              工具
            </span>
            <span className="text-gray-500 font-normal">({tools.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-3 py-1 rounded-lg text-sm">
              文章
            </span>
            <span className="text-gray-500 font-normal">({posts.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ tools: Tool[], posts: Post[] }>({ tools: [], posts: [] });
  const [loading, setLoading] = useState(false);

  // 客户端搜索实现
  useEffect(() => {
    const searchContent = async () => {
      if (!query.trim()) {
        setResults({ tools: [], posts: [] });
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setResults({ tools: [], posts: [] });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-center">搜索</h1>
            <p className="text-center text-gray-600 mb-8">查找工具和文章内容</p>

            {/* 搜索框 */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入关键词搜索..."
                className="w-full px-6 py-4 pl-14 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
              <svg
                className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-500 mt-4">搜索中...</p>
          </div>
        ) : (
          <SearchResults tools={results.tools} posts={results.posts} query={query} />
        )}
      </div>
    </div>
  );
}
