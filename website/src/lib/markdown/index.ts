// Mingxi-Info Markdown Utilities
// 用于加载和解析Markdown内容

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { remarkTransformLinks } from './remarkTransformLinks';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownContent {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    author?: string;
    [key: string]: any;
  };
  content: string;
  htmlContent?: string;
}

/**
 * 获取指定目录下的所有Markdown文件
 */
export function getMarkdownFiles(directory: string): string[] {
  const fullPath = path.join(contentDirectory, directory);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files.filter(file => file.endsWith('.md'));
}

/**
 * 读取单个Markdown文件
 */
export async function getMarkdownContent(
  directory: string,
  filename: string
): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(contentDirectory, directory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 将Markdown转换为HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content);
    const htmlContent = processedContent.toString();

    const slug = filename.replace(/\.md$/, '');

    return {
      slug,
      frontmatter: data as any,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading markdown file: ${directory}/${filename}`, error);
    return null;
  }
}

/**
 * 获取目录下所有Markdown文件的内容
 */
export async function getAllMarkdownContent(
  directory: string
): Promise<MarkdownContent[]> {
  const files = getMarkdownFiles(directory);
  const contents = await Promise.all(
    files.map(file => getMarkdownContent(directory, file))
  );

  return contents.filter((content): content is MarkdownContent => content !== null);
}

/**
 * 根据slug获取特定的Markdown内容
 */
export async function getMarkdownBySlug(
  directory: string,
  slug: string
): Promise<MarkdownContent | null> {
  const filename = `${slug}.md`;
  return getMarkdownContent(directory, filename);
}

/**
 * 获取所有招聘职位
 */
export async function getAllPositions(): Promise<MarkdownContent[]> {
  try {
    const positionsPath = path.join(process.cwd(), 'content/details/positions');

    if (!fs.existsSync(positionsPath)) {
      return [];
    }

    const folders = fs.readdirSync(positionsPath, { withFileTypes: true });
    const positions: MarkdownContent[] = [];

    for (const folder of folders) {
      if (!folder.isDirectory()) continue;

      const position = await getPosition(folder.name);
      if (position) {
        positions.push(position);
      }
    }

    return positions;
  } catch (error) {
    console.error('Error loading positions:', error);
    return [];
  }
}

/**
 * 获取单个招聘职位
 */
export async function getPosition(slug: string): Promise<MarkdownContent | null> {
  try {
    const positionPath = path.join(process.cwd(), 'content/details/positions', slug);
    const readmePath = path.join(positionPath, 'README.md');

    if (!fs.existsSync(readmePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(readmePath, 'utf8');
    const { data, content } = matter(fileContents);

    // 将Markdown转换为HTML，转换相对链接为网站路由
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkTransformLinks, { baseSlug: slug })
      .use(html)
      .process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: {
        title: data.title || extractTitle(content),
        ...data
      } as any,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error loading position ${slug}:`, error);
    return null;
  }
}

/**
 * 从Markdown内容中提取标题
 */
function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

/**
 * 获取公司文档
 */
export async function getCompanyDoc(slug: string): Promise<MarkdownContent | null> {
  return getMarkdownBySlug('docs', slug);
}

/**
 * 获取团队成员信息
 */
export async function getTeamMembers(): Promise<MarkdownContent[]> {
  return getAllMarkdownContent('docs/team');
}
