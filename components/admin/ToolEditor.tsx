'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Tool } from '@/types/content';

interface ToolEditorProps {
  tool: Omit<Tool, 'slug'> | Tool;
  onSave: (tool: Omit<Tool, 'slug'>) => void;
  saving: boolean;
}

const EMOJIS = ['🤖', '🔧', '⚡', '🚀', '💡', '🎯', '📦', '🔮', '✨', '🛠️', '📊', '🎨'];

export function ToolEditor({ tool, onSave, saving }: ToolEditorProps) {
  const [name, setName] = useState(tool.name);
  const [icon, setIcon] = useState(tool.icon);
  const [description, setDescription] = useState(tool.description);
  const [longDescription, setLongDescription] = useState(tool.longDescription || '');
  const [category, setCategory] = useState(tool.category);
  const [tags, setTags] = useState(tool.tags.join(', '));
  const [officialUrl, setOfficialUrl] = useState(tool.officialUrl || '');
  const [tutorialUrl, setTutorialUrl] = useState(tool.tutorialUrl || '');
  const [featured, setFeatured] = useState(tool.featured || false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      alert('请填写名称和描述');
      return;
    }

    onSave({
      name: name.trim(),
      icon: icon.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      category: category.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      officialUrl: officialUrl.trim() || undefined,
      tutorialUrl: tutorialUrl.trim() || undefined,
      featured,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="flex justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          {showPreview ? '编辑' : '预览'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* 名称和图标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              工具名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Claude Code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              图标
            </label>
            <div className="flex gap-2">
              <select
                value={icon}
                onChange={e => setIcon(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-center text-2xl"
              >
                {EMOJIS.map(emoji => (
                  <option key={emoji} value={emoji}>
                    {emoji}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={icon}
                onChange={e => setIcon(e.target.value)}
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-center text-2xl"
                maxLength={2}
              />
            </div>
          </div>
        </div>

        {/* 简短描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            简短描述 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="一句话描述这个工具"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">{description.length}/100</p>
        </div>

        {/* 分类和标签 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分类
            </label>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="AI编程"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签 <span className="text-gray-500">(用逗号分隔)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="AI, 效率, 开发工具"
            />
          </div>
        </div>

        {/* 链接 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              官网链接 <span className="text-gray-500">(可选)</span>
            </label>
            <input
              type="url"
              value={officialUrl}
              onChange={e => setOfficialUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              教程链接 <span className="text-gray-500">(可选)</span>
            </label>
            <input
              type="url"
              value={tutorialUrl}
              onChange={e => setTutorialUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* 特色推荐 */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={e => setFeatured(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">
            设为特色推荐
          </label>
        </div>

        {/* 详细描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            详细介绍 <span className="text-gray-500">(支持Markdown，可选)</span>
          </label>
          {showPreview ? (
            <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {longDescription}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={longDescription}
              onChange={e => setLongDescription(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm"
              placeholder="详细描述工具的功能、使用方法等..."
            />
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
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
