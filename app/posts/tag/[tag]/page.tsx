import { getPostsByTag, getAllTags } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} - 文章标签 - 六木先生`,
    description: `查看所有标签为 ${tag} 的文章`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回文章列表
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">#{tag}</h1>
            <p className="text-lg text-gray-600">共 {posts.length} 篇文章</p>
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
