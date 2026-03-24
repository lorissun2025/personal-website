import { getAllTools, getAllCategories } from '@/lib/content';
import { Metadata } from 'next';
import ToolCard from '@/components/ToolCard';

export const metadata: Metadata = {
  title: 'AI工具箱 - 六木先生',
  description: '我推荐的 AI 辅助开发与产品工具，助力高效开发与产品设计',
};

export default async function ToolsPage() {
  const tools = await getAllTools();
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              推荐
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">AI 工具箱</h1>
            <p className="text-lg text-gray-600">我推荐的 AI 辅助开发与产品工具，助力高效开发与产品设计</p>
          </div>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="container-custom py-4">
          <div className="flex gap-3 overflow-x-auto">
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-medium whitespace-nowrap">
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 工具列表 */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无工具</p>
          </div>
        )}
      </div>
    </div>
  );
}
