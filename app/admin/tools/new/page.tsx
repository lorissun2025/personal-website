'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToolEditor } from '@/components/admin/ToolEditor';
import type { Tool } from '@/types/content';

export default function NewToolPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const initialTool: Omit<Tool, 'slug'> = {
    name: '',
    icon: '🔧',
    description: '',
    longDescription: '',
    category: 'AI编程',
    tags: [],
    featured: false,
  };

  const handleSave = async (tool: Omit<Tool, 'slug'>) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tool),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/tools/${data.tool.slug}`);
        router.refresh();
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">新建工具</h1>
      <ToolEditor
        tool={initialTool}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
