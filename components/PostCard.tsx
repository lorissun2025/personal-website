import Link from 'next/link';
import { Post } from '@/types/content';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

const platformConfig = {
  wechat: { name: '公众号', icon: '💬', color: 'bg-green-50 text-green-700' },
  xiaohongshu: { name: '小红书', icon: '📱', color: 'bg-red-50 text-red-600' },
  twitter: { name: 'Twitter', icon: '🐦', color: 'bg-blue-50 text-sky-700' },
  tiktok: { name: 'TikTok', icon: '🎵', color: 'bg-red-50 text-red-600' },
  website: { name: '网站', icon: '🌐', color: 'bg-purple-50 text-purple-700' },
};

export default function PostCard({ post }: PostCardProps) {
  const platform = platformConfig[post.platform];

  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <article className="bg-white rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 h-full">
        {/* 平台标签 */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`${platform.color} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
            <span>{platform.icon}</span>
            <span>{platform.name}</span>
          </span>
          {post.readingTime && (
            <span className="text-gray-400 text-xs">{post.readingTime} 分钟阅读</span>
          )}
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {post.title}
        </h3>

        {/* 描述 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 元信息 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <time dateTime={post.date}>
            {formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: zhCN })}
          </time>
          {post.externalUrl && (
            <span className="text-purple-600">外部链接 →</span>
          )}
        </div>
      </article>
    </Link>
  );
}
