export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-200 py-25">
      <div className="container-custom">
        <div className="flex items-center gap-15">
          <div className="flex-1">
            <span className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              👋 你好，我是
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-5 tracking-tight">
              六木先生<br />
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                AI产品经理
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              10多年产品经理与产品架构经验，现深耕 AI 与 VibeCoding
              领域。专注探索 AI 驱动的产品创新与开发新范式。
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-7 py-3.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold text-base transition-transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-purple-500/40"
              >
                关注我
              </a>
              <a
                href="#writing"
                className="px-7 py-3.5 bg-gray-100 text-gray-900 rounded-xl font-semibold text-base transition-colors hover:bg-gray-200"
              >
                阅读文章
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 w-[350px] h-[350px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[30px] flex items-center justify-center text-white text-[120px] font-bold">
            六
          </div>
        </div>
      </div>
    </section>
  );
}
