'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Post } from '@/types/content';

interface PostEditorProps {
  post: Omit<Post, 'slug' | 'readingTime'> | Post;
  onSave: (post: Omit<Post, 'slug' | 'readingTime'>) => void;
  saving: boolean;
}

export function PostEditor({ post, onSave, saving }: PostEditorProps) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [platform, setPlatform] = useState(post.platform);
  const [tags, setTags] = useState(post.tags.join(', '));
  const [published, setPublished] = useState(post.published !== false);
  const [externalUrl, setExternalUrl] = useState(post.externalUrl || '');
  const [coverImage, setCoverImage] = useState(post.coverImage || '');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !content.trim()) {
      alert('请填写标题、描述和内容');
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      date: post.date,
      category: category.trim(),
      platform: platform as any,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      published,
      externalUrl: externalUrl.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          {showPreview ? '编辑' : '预览'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="文章标题"
            />
          </div>

          {/* 描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              placeholder="文章简短描述"
            />
          </div>

          {/* 分类和平台 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="产品方法论"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                平台
              </label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="website">网站</option>
                <option value="wechat">微信公众号</option>
                <option value="xiaohongshu">小红书</option>
                <option value="twitter">Twitter</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签 <span className="text-gray-500">(用逗号分隔)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="AI产品, VibeCoding, 效率"
            />
          </div>

          {/* 外部链接 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              外部链接 <span className="text-gray-500">(可选)</span>
            </label>
            <input
              type="url"
              value={externalUrl}
              onChange={e => setExternalUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="https://..."
            />
          </div>

          {/* 封面图 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              封面图URL <span className="text-gray-500">(可选)</span>
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="https://..."
            />
          </div>

          {/* 发布状态 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              立即发布
            </label>
          </div>
        </div>

        {/* 内容编辑器或预览 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            内容 <span className="text-red-500">*</span>
            <span className="text-gray-500 ml-2">(支持Markdown)</span>
          </label>
          {showPreview ? (
            <div className="border border-gray-300 rounded-lg p-4 min-h-[500px] prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm"
              placeholder="在这里写文章内容，支持Markdown格式..."
            />
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
}
