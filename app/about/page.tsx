import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于 - 六木先生',
  description: '10多年产品经理与产品架构经验，现深耕 AI 与 VibeCoding 领域',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-8 flex items-center justify-center text-6xl shadow-lg">
              六
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              六木先生
            </h1>
            <p className="text-xl text-white/90">AI 产品经理</p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          {/* 简介 */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">关于我</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                你好，我是六木先生，一名拥有 10 多年产品经理与产品架构经验的从业者。
              </p>
              <p className="mb-6">
                目前深耕于 AI 与 VibeCoding 领域，探索如何利用人工智能技术重构产品开发流程，
                让编程如呼吸般自然，让创意能够更快地落地。
              </p>
              <p>
                相信 AI 不是要取代人类，而是赋能人类，让每个人都能成为创造者。
              </p>
            </div>
          </section>

          {/* 经历 */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">经历</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-500 font-medium">
                  2023 - 至今
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI 产品经理</h3>
                  <p className="text-gray-600">专注 AI 原生产品设计与开发，探索 VibeCoding 新范式</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-500 font-medium">
                  2018 - 2023
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">高级产品经理 / 产品架构师</h3>
                  <p className="text-gray-600">负责多款 B2B 产品从 0 到 1 的设计与落地</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm text-gray-500 font-medium">
                  2014 - 2018
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">产品经理</h3>
                  <p className="text-gray-600">从移动应用到企业服务，积累了丰富的产品经验</p>
                </div>
              </div>
            </div>
          </section>

          {/* 技能 */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold mb-6">专注领域</h2>
            <div className="flex flex-wrap gap-3">
              {['AI 产品', 'VibeCoding', '产品架构', 'B2B SaaS', '用户体验', '敏捷开发'].map((skill) => (
                <span
                  key={skill}
                  className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 联系方式 */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">保持联系</h2>
            <p className="text-gray-600 mb-6">
              欢迎与我交流 AI 产品、VibeCoding 或任何有趣的话题
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                阅读我的文章
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                查看推荐工具
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
