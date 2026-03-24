import { getToolBySlug, getAllTools } from '@/lib/content';
import { notFound } from 'next/navigation';
import ToolDetail from '@/components/ToolDetail';
import { Metadata } from 'next';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: '工具未找到',
    };
  }

  return {
    title: `${tool.name} - 六木先生`,
    description: tool.description,
  };
}

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // 获取相关工具（同分类的其他工具）
  const allTools = await getAllTools();
  const relatedTools = allTools
    .filter(t => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <ToolDetail tool={tool} relatedTools={relatedTools} />
      </div>
    </div>
  );
}
