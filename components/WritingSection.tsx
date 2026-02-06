import { articles, platformStyles } from "@/lib/data";

export default function WritingSection() {
  return (
    <section id="writing" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-15">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            创作
          </span>
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">内容分享</h2>
          <p className="text-gray-600">我在各平台分享 AI 产品与 VibeCoding 见解</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl p-7 border border-gray-200 transition-all duration-300 hover:border-purple-500"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${platformStyles[article.platform]}`}
                >
                  {article.icon} {article.platformName}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2.5">{article.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3.5">
                {article.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.time}</span>
                <div className="flex gap-4">
                  <span>👁 {article.views}</span>
                  <span>❤️ {article.likes.toLocaleString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
