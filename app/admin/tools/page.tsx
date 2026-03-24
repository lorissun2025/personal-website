'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Tool } from '@/types/content';

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/admin/tools');
      const data = await response.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error('Failed to fetch tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`确定要删除工具 "${name}" 吗？`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tools/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTools(tools.filter(t => t.slug !== slug));
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('Failed to delete tool:', error);
      alert('删除失败');
    }
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">工具管理</h1>
        <Link
          href="/admin/tools/new"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
        >
          新建工具
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {tools.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            暂无工具
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  工具
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标签
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  特色
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tools.map(tool => (
                <tr key={tool.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <Link
                          href={`/admin/tools/${tool.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-purple-600"
                        >
                          {tool.name}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">{tool.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{tool.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {tool.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{tool.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tool.featured ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-purple-100 text-purple-800">
                        特色
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/tools/${tool.slug}`}
                      className="text-purple-600 hover:text-purple-900 mr-4"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(tool.slug, tool.name)}
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
