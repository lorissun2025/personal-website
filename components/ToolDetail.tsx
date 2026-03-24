import Link from 'next/link';
import { Tool } from '@/types/content';

interface ToolDetailProps {
  tool: Tool;
  relatedTools?: Tool[];
}

export default function ToolDetail({ tool, relatedTools = [] }: ToolDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回工具列表
      </Link>

      {/* 工具头部 */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            {tool.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{tool.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{tool.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm font-medium">
                {tool.category}
              </span>
              {tool.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 pt-6 border-t border-gray-100">
          {tool.officialUrl && (
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              访问官网
            </a>
          )}
          {tool.tutorialUrl && (
            <a
              href={tool.tutorialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              使用教程
            </a>
          )}
        </div>
      </div>

      {/* 详细介绍 */}
      {tool.longDescription && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold mb-4">详细介绍</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tool.longDescription}</p>
          </div>
        </div>
      )}

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">相关工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map((relatedTool) => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-500 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {relatedTool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{relatedTool.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{relatedTool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
