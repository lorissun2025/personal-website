import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Tool, Post, ToolFrontmatter, PostFrontmatter } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const TOOLS_DIR = path.join(CONTENT_DIR, 'tools');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');

// 确保目录存在
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 获取所有工具
export async function getAllTools(): Promise<Tool[]> {
  ensureDir(TOOLS_DIR);

  const files = fs.readdirSync(TOOLS_DIR);
  const tools = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(TOOLS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace('.md', '');

      return {
        slug,
        name: data.name,
        icon: data.icon,
        description: data.description,
        longDescription: data.longDescription || content,
        category: data.category,
        tags: data.tags || [],
        officialUrl: data.officialUrl,
        tutorialUrl: data.tutorialUrl,
        featured: data.featured || false,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      } as Tool;
    });

  return tools.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

// 获取单个工具
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  ensureDir(TOOLS_DIR);

  try {
    const filePath = path.join(TOOLS_DIR, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      name: data.name,
      icon: data.icon,
      description: data.description,
      longDescription: data.longDescription || content,
      category: data.category,
      tags: data.tags || [],
      officialUrl: data.officialUrl,
      tutorialUrl: data.tutorialUrl,
      featured: data.featured || false,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    } as Tool;
  } catch {
    return null;
  }
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  ensureDir(POSTS_DIR);

  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.(md|mdx)$/, '');

      // 只返回已发布的文章
      if (data.published === false) return null;

      return {
        slug,
        title: data.title,
        description: data.description,
        content,
        date: data.date,
        tags: data.tags || [],
        category: data.category,
        platform: data.platform || 'website',
        externalUrl: data.externalUrl,
        coverImage: data.coverImage,
        readingTime: calculateReadingTime(content),
      } as Post;
    })
    .filter((post): post is Post => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 获取单个文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureDir(POSTS_DIR);

  try {
    // 尝试 .md 和 .mdx 两种扩展名
    let filePath = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // 检查是否已发布
    if (data.published === false) return null;

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      date: data.date,
      tags: data.tags || [],
      category: data.category,
      platform: data.platform || 'website',
      externalUrl: data.externalUrl,
      coverImage: data.coverImage,
      readingTime: calculateReadingTime(content),
    } as Post;
  } catch {
    return null;
  }
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();

  posts.forEach(post => {
    categories.add(post.category);
  });

  return Array.from(categories).sort();
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

// 获取特色工具
export async function getFeaturedTools(): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter(tool => tool.featured);
}

// 获取最新文章
export async function getLatestPosts(count: number = 4): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

// 计算阅读时间（分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 中文阅读速度（字/分钟）
  const wordCount = content.length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// 搜索功能
export async function searchContent(query: string): Promise<{ tools: Tool[], posts: Post[] }> {
  const [tools, posts] = await Promise.all([getAllTools(), getAllPosts()]);
  const lowerQuery = query.toLowerCase();

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    tool.category.toLowerCase().includes(lowerQuery)
  );

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  );

  return { tools: filteredTools, posts: filteredPosts };
}
