import { getPostBySlug, getAllPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostContent from '@/components/PostContent';
import Link from 'next/link';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - 六木先生`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 获取相关文章（同标签的文章）
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* 返回按钮 */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回文章列表
        </Link>

        {/* 文章内容 */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 mb-8">
          <PostContent post={post} />
        </div>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/posts/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="p-4 rounded-xl border border-gray-200 hover:border-purple-500 transition-colors">
                    <h3 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
