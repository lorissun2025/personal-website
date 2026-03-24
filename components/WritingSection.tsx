import Link from 'next/link';
import { getAllPosts } from '@/lib/data';
import PostCard from '@/components/PostCard';

export default async function WritingSection() {
  const posts = await getAllPosts();

  return (
    <section id="writing" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-15">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            创作
          </span>
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">最新文章</h2>
          <p className="text-gray-600">分享 AI 产品方法论与 VibeCoding 实践经验</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            查看全部文章
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
