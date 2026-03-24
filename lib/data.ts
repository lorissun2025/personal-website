// 网站配置数据 - 方便统一管理内容

// 从 content.ts 导入内容获取函数
export { getAllTools, getAllPosts, getToolBySlug, getPostBySlug, getAllTags, getAllCategories } from './content';

export const siteConfig = {
  name: "六木先生",
  title: "AI产品经理",
  description: "10多年产品经理与产品架构经验，现深耕 AI 与 VibeCoding 领域",
  copyright: "© 2024 六木先生. AI + VibeCoding 🚀",
  url: "https://liumu.app",
};

export const navItems = [
  { name: "首页", href: "/" },
  { name: "工具", href: "/tools" },
  { name: "文章", href: "/posts" },
  { name: "关于", href: "/about" },
  { name: "搜索", href: "/search" },
];

export const tools = [
  {
    icon: "🤖",
    name: "Claude Code",
    description: "AI 驱动的代码助手，支持自然语言编程，大幅提升开发效率。",
    tags: ["AI编程", "效率"],
  },
  {
    icon: "🎯",
    name: "VibeCoding 工具集",
    description: "基于直觉与流动态的开发工具，让代码创作如行云流水。",
    tags: ["VibeCoding", "开发体验"],
  },
  {
    icon: "📊",
    name: "产品架构设计",
    description: "AI 辅助的产品架构设计工具，快速生成系统架构图与文档。",
    tags: ["架构", "设计"],
  },
];

export const projects = [
  {
    icon: "🧠",
    name: "AI 智能助手",
    description: "基于大模型的智能对话产品，支持多场景应用与深度定制。",
    tags: ["AI产品", "LLM"],
  },
  {
    icon: "⚡️",
    name: "Vibe IDE",
    description: "新一代 AI 原生开发环境，重新定义编程体验。",
    tags: ["开发工具", "VibeCoding"],
  },
  {
    icon: "🏗️",
    name: "产品架构平台",
    description: "企业级产品架构设计平台，可视化建模与自动化文档生成。",
    tags: ["B2B", "架构"],
  },
];

export const articles = [
  {
    platform: "wechat" as const,
    platformName: "公众号",
    icon: "💬",
    title: "AI 产品经理的 VibeCoding 实践",
    description: "探索如何用 AI 重构产品开发流程，让编程如呼吸般自然。",
    time: "3 天前",
    views: "5.2k",
    likes: 312,
  },
  {
    platform: "xiaohongshu" as const,
    platformName: "小红书",
    icon: "📱",
    title: "我用 AI 做产品的 10 个秘诀",
    description: "从需求分析到产品落地，AI 如何改变产品经理的工作方式。",
    time: "1 周前",
    views: "8.6k",
    likes: 891,
  },
  {
    platform: "twitter" as const,
    platformName: "Twitter",
    icon: "🐦",
    title: "The Future of AI-Powered Product Building",
    description: "How AI is transforming the way we build products, from idea to launch.",
    time: "2 周前",
    views: "12k",
    likes: 1400,
  },
  {
    platform: "tiktok" as const,
    platformName: "TikTok",
    icon: "🎵",
    title: "5分钟带你了解 VibeCoding",
    description: "用短视频展示 AI 辅助编程的魅力，让开发更简单更有趣。",
    time: "3 周前",
    views: "45k",
    likes: 3800,
  },
];

export const socialLinks = [
  { name: "公众号", href: "#" },
  { name: "小红书", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "TikTok", href: "#" },
];

export const platformStyles: Record<string, string> = {
  wechat: "bg-green-50 text-green-700",
  xiaohongshu: "bg-red-50 text-red-600",
  twitter: "bg-blue-50 text-sky-700",
  tiktok: "bg-red-50 text-red-600",
};
