import Link from 'next/link';
import { Tool } from '@/types/content';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 h-full cursor-pointer">
        <div className="w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-2xl mb-5">
          {tool.icon}
        </div>
        <h3 className="text-lg font-bold mb-3">{tool.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">{tool.description}</p>
        <div className="flex flex-wrap gap-2">
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
  );
}
