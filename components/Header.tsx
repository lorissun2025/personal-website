import { siteConfig, navItems } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 py-6">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">{siteConfig.name}</div>
          <nav className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
