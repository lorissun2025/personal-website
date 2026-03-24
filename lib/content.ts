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

// ==================== 管理后台写操作 ====================

// 获取所有文章（包括草稿）
export async function getAllPostsWithDrafts(): Promise<Post[]> {
  ensureDir(POSTS_DIR);

  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.(md|mdx)$/, '');

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
        published: data.published !== false,
      } as Post;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 创建文章
export async function createPost(post: Omit<Post, 'slug' | 'readingTime'>): Promise<Post> {
  ensureDir(POSTS_DIR);

  // 生成slug
  const slug = generateSlug(post.title);
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    throw new Error(`文章 "${post.title}" 已存在`);
  }

  // 构建frontmatter
  const frontmatter = {
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    category: post.category,
    platform: post.platform,
    externalUrl: post.externalUrl,
    coverImage: post.coverImage,
    published: post.published ?? true,
  };

  // 写入文件
  const fileContent = matter.stringify(post.content, frontmatter);
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  return {
    ...post,
    slug,
    readingTime: calculateReadingTime(post.content),
  };
}

// 更新文章
export async function updatePost(slug: string, post: Omit<Post, 'slug' | 'readingTime'>): Promise<Post> {
  ensureDir(POSTS_DIR);

  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  // 如果slug改变（标题改变），需要重命名文件
  const newSlug = generateSlug(post.title);
  const newFilePath = path.join(POSTS_DIR, `${newSlug}.md`);

  // 构建frontmatter
  const frontmatter = {
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    category: post.category,
    platform: post.platform,
    externalUrl: post.externalUrl,
    coverImage: post.coverImage,
    published: post.published ?? true,
  };

  // 写入文件
  const fileContent = matter.stringify(post.content, frontmatter);

  // 如果是新slug，删除旧文件
  if (newSlug !== slug && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  fs.writeFileSync(newFilePath, fileContent, 'utf-8');

  return {
    ...post,
    slug: newSlug,
    readingTime: calculateReadingTime(post.content),
  };
}

// 删除文章
export async function deletePost(slug: string): Promise<void> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`文章 "${slug}" 不存在`);
  }

  fs.unlinkSync(filePath);
}

// 创建工具
export async function createTool(tool: Omit<Tool, 'slug'>): Promise<Tool> {
  ensureDir(TOOLS_DIR);

  // 生成slug
  const slug = generateSlug(tool.name);
  const filePath = path.join(TOOLS_DIR, `${slug}.md`);

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    throw new Error(`工具 "${tool.name}" 已存在`);
  }

  // 构建frontmatter
  const frontmatter = {
    name: tool.name,
    icon: tool.icon,
    description: tool.description,
    longDescription: tool.longDescription,
    category: tool.category,
    tags: tool.tags,
    officialUrl: tool.officialUrl,
    tutorialUrl: tool.tutorialUrl,
    featured: tool.featured || false,
    createdAt: tool.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 写入文件
  const fileContent = matter.stringify('', frontmatter);
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  return { ...tool, slug };
}

// 更新工具
export async function updateTool(slug: string, tool: Omit<Tool, 'slug'>): Promise<Tool> {
  ensureDir(TOOLS_DIR);

  const filePath = path.join(TOOLS_DIR, `${slug}.md`);

  // 生成新slug
  const newSlug = generateSlug(tool.name);
  const newFilePath = path.join(TOOLS_DIR, `${newSlug}.md`);

  // 构建frontmatter
  const frontmatter = {
    name: tool.name,
    icon: tool.icon,
    description: tool.description,
    longDescription: tool.longDescription,
    category: tool.category,
    tags: tool.tags,
    officialUrl: tool.officialUrl,
    tutorialUrl: tool.tutorialUrl,
    featured: tool.featured || false,
    createdAt: tool.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 写入文件
  const fileContent = matter.stringify('', frontmatter);

  // 如果是新slug，删除旧文件
  if (newSlug !== slug && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  fs.writeFileSync(newFilePath, fileContent, 'utf-8');

  return { ...tool, slug: newSlug };
}

// 删除工具
export async function deleteTool(slug: string): Promise<void> {
  const filePath = path.join(TOOLS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`工具 "${slug}" 不存在`);
  }

  fs.unlinkSync(filePath);
}

// 生成URL友好的slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9\s-]/g, '') // 保留中文、字母、数字、空格、连字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim();
}
