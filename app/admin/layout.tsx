import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 检查认证状态
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                管理后台
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/admin/posts"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
                >
                  文章
                </Link>
                <Link
                  href="/admin/tools"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
                >
                  工具
                </Link>
                <Link
                  href="/admin/media"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
                >
                  媒体
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
              >
                查看网站
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/auth" method="POST">
      <input type="hidden" name="action" value="logout" />
      <button
        type="submit"
        className="text-gray-600 hover:text-gray-900 text-sm font-medium transition"
      >
        登出
      </button>
    </form>
  );
}
