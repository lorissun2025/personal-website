import { siteConfig, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 py-15">
      <div className="container-custom">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wider">
            关注我
          </p>
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
