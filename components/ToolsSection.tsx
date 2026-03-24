import Link from 'next/link';
import { getAllTools } from '@/lib/data';

export default async function ToolsSection() {
  const tools = await getAllTools();

  return (
    <section id="tools" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-15">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            推荐
          </span>
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">AI 工具箱</h2>
          <p className="text-gray-600">我推荐的 AI 辅助开发与产品工具</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-2xl mb-5">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-purple-600 transition-colors">{tool.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">{tool.description}</p>
                <div className="flex gap-2">
                  {tool.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            查看全部工具
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
