import Link from 'next/link';
import { siteConfig, navItems } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
            {siteConfig.name}
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
