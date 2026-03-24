import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllPosts, getAllTools } from '@/lib/content';
import { isAuthenticated } from '@/lib/admin/auth';

export default async function AdminPage() {
  // 检查认证
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const posts = await getAllPosts();
  const tools = await getAllTools();

  const publishedPosts = posts.filter(p => p.published);
  const draftPosts = posts.filter(p => !p.published);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">管理后台</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="文章总数" value={posts.length} href="/admin/posts" />
        <StatCard label="已发布" value={publishedPosts.length} href="/admin/posts" />
        <StatCard label="草稿" value={draftPosts.length} href="/admin/posts?filter=draft" />
        <StatCard label="工具总数" value={tools.length} href="/admin/tools" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            href="/admin/posts/new"
            label="新建文章"
            description="创建新的博客文章"
            emoji="📝"
          />
          <QuickAction
            href="/admin/tools/new"
            label="新建工具"
            description="添加新的工具推荐"
            emoji="🔧"
          />
          <QuickAction
            href="/admin/media"
            label="媒体管理"
            description="上传和管理图片"
            emoji="🖼️"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </Link>
  );
}

function QuickAction({
  href,
  label,
  description,
  emoji,
}: {
  href: string;
  label: string;
  description: string;
  emoji: string;
}) {
  return (
    <Link href={href}>
      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 hover:shadow-sm transition">
        <div className="text-2xl mb-2">{emoji}</div>
        <div className="font-medium text-gray-900 mb-1">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </Link>
  );
}
