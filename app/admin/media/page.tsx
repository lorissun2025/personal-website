'use client';

import { useEffect, useState } from 'react';
import type { MediaFile } from '@/types/admin';

interface MediaItem {
  filename: string;
  url: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchFiles();
      } else {
        const error = await response.json();
        alert(error.error || '上传失败');
      }
    } catch (error) {
      console.error('Failed to upload:', error);
      alert('上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`确定要删除 ${filename} 吗？`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/media?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFiles(files.filter(f => f.filename !== filename));
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('删除失败');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('已复制链接到剪贴板');
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">媒体管理</h1>

      {/* 上传区域 */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors ${
          dragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-block"
        >
          <div className="text-4xl mb-3">📁</div>
          <p className="text-gray-700 font-medium mb-1">
            {uploading ? '上传中...' : '点击或拖拽上传图片'}
          </p>
          <p className="text-sm text-gray-500">
            支持 JPG、PNG、WebP、GIF 格式，最大 5MB
          </p>
        </label>
      </div>

      {/* 图片列表 */}
      {files.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
          暂无图片
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map(file => (
            <div
              key={file.filename}
              className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-square relative">
                <img
                  src={file.url}
                  alt={file.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => copyUrl(file.url)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                    title="复制链接"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => handleDelete(file.filename)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    title="删除"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate" title={file.filename}>
                  {file.filename}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
