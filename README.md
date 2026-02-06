# 六木先生个人网站

Next.js + Tailwind CSS 构建的个人网站

## 技术栈

- **Next.js 15** - React 框架 (App Router)
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Vercel** - 部署平台（推荐）

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 配置

### 环境变量

1. 复制 `.env.example` 为 `.env.local`

```bash
cp .env.example .env.local
```

2. 填入配置值（可选）

### 自定义内容

编辑以下文件来自定义内容：

- `app/page.tsx` - 主页面结构
- `components/Hero.tsx` - Hero 区域
- `components/ToolsSection.tsx` - 工具箱内容
- `components/ProjectsSection.tsx` - 项目展示
- `components/WritingSection.tsx` - 文章列表
- `components/Footer.tsx` - 底部社交链接

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 其他平台

```bash
npm run build
# 将 .next 文件夹部署到你的托管平台
```

## 隐私安全

- 不在代码中硬编码 API Key
- 使用环境变量管理敏感信息
- `.env.local` 已被 .gitignore 忽略

## 许可证

MIT
