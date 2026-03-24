'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ToolEditor } from '@/components/admin/ToolEditor';
import type { Tool } from '@/types/content';

export default function EditToolPage() {
  const router = useRouter();
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTool();
  }, [params.slug]);

  const fetchTool = async () => {
    try {
      const response = await fetch(`/api/admin/tools/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setTool(data.tool);
      } else {
        alert('工具不存在');
        router.push('/admin/tools');
      }
    } catch (error) {
      console.error('Failed to fetch tool:', error);
      alert('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedTool: Omit<Tool, 'slug'>) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/tools/${params.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTool),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.tool.slug !== params.slug) {
          router.push(`/admin/tools/${data.tool.slug}`);
        } else {
          router.refresh();
        }
      } else {
        const error = await response.json();
        alert(error.error || '保存失败');
      }
    } catch (error) {
      console.error('Failed to save tool:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">加载中...</div>;
  }

  if (!tool) {
    return <div className="text-center py-12">工具不存在</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">编辑工具</h1>
      <ToolEditor
        tool={tool}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
