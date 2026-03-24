import { Post } from '@/types/content';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface PostContentProps {
  post: Post;
}

const platformConfig = {
  wechat: { name: '公众号', icon: '💬', color: 'bg-green-50 text-green-700' },
  xiaohongshu: { name: '小红书', icon: '📱', color: 'bg-red-50 text-red-600' },
  twitter: { name: 'Twitter', icon: '🐦', color: 'bg-blue-50 text-sky-700' },
  tiktok: { name: 'TikTok', icon: '🎵', color: 'bg-red-50 text-red-600' },
  website: { name: '网站', icon: '🌐', color: 'bg-purple-50 text-purple-700' },
};

export default function PostContent({ post }: PostContentProps) {
  const platform = platformConfig[post.platform];

  return (
    <article className="max-w-3xl mx-auto">
      {/* 文章头部 */}
      <header className="mb-10">
        {/* 平台标签 */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`${platform.color} px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2`}>
            <span className="text-base">{platform.icon}</span>
            <span>{platform.name}</span>
          </span>
          {post.category && (
            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">
              {post.category}
            </span>
          )}
        </div>

        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* 描述 */}
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {post.description}
        </p>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
            </time>
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          )}
        </div>

        {/* 标签 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 文章内容 */}
      <div className="prose prose-gray prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* 外部链接按钮 */}
      {post.externalUrl && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            阅读原文
          </a>
        </div>
      )}
    </article>
  );
}
