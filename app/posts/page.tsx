import { getAllPosts, getAllCategories, getAllTags } from '@/lib/content';
import { Metadata } from 'next';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '文章 - 六木先生',
  description: '分享 AI 产品方法论、VibeCoding 实践经验和技术思考',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              内容创作
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">文章</h1>
            <p className="text-lg text-gray-600">分享 AI 产品方法论、VibeCoding 实践经验和技术思考</p>
          </div>
        </div>
      </div>

      {/* 分类和标签筛选 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex gap-3 overflow-x-auto">
            <Link
              href="/posts"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-medium whitespace-nowrap"
            >
              全部
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/posts?category=${category}`}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
          {tags.length > 0 && (
            <div className="flex gap-2 overflow-x-auto mt-3 pt-3 border-t border-gray-100">
              {tags.slice(0, 10).map((tag) => (
                <Link
                  key={tag}
                  href={`/posts/tag/${tag}`}
                  className="px-3 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium whitespace-nowrap hover:bg-gray-100 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 文章列表 */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
