// Mingxi-Info - Position Document Page
// 职位子文档页面 (如 JD、技术要求、面试流程等)

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { Button } from '@/components/ui';

interface DocPageProps {
  params: {
    slug: string;
    doc: string[];
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const positionsPath = path.join(process.cwd(), 'content/details/positions');
  const hirePath = path.join(process.cwd(), 'content/details/hire');

  const paths: Array<{ slug: string; doc: string[] }> = [];

  // 生成 positions 下的文档路径
  if (fs.existsSync(positionsPath)) {
    const folders = fs.readdirSync(positionsPath, { withFileTypes: true });

    for (const folder of folders) {
      if (!folder.isDirectory()) continue;

      const detailsPath = path.join(positionsPath, folder.name, 'details');
      if (fs.existsSync(detailsPath)) {
        const files = fs.readdirSync(detailsPath);
        files.forEach((file) => {
          if (file.endsWith('.md')) {
            const docName = file.replace(/\.md$/, '');
            paths.push({
              slug: folder.name,
              doc: ['details', docName],
            });
          }
        });
      }
    }
  }

  // 生成 hire 目录下的文档路径（所有职位共享）
  if (fs.existsSync(hirePath)) {
    const hireFiles = fs.readdirSync(hirePath);
    const slugs = fs.existsSync(positionsPath)
      ? fs.readdirSync(positionsPath, { withFileTypes: true })
          .filter(f => f.isDirectory())
          .map(f => f.name)
      : [];

    hireFiles.forEach((file) => {
      if (file.endsWith('.md')) {
        const docName = file.replace(/\.md$/, '');
        // 为每个职位生成 hire 文档路径
        slugs.forEach((slug) => {
          paths.push({
            slug,
            doc: ['hire', docName],
          });
        });
      }
    });
  }

  return paths;
}

// 获取文档内容
async function getDocContent(slug: string, docPath: string[]) {
  let filePath: string;

  // 如果路径以 'hire' 开头，从 content/details/hire 读取
  if (docPath[0] === 'hire') {
    filePath = path.join(
      process.cwd(),
      'content/details/hire',
      docPath.slice(1).join('/')
    ) + '.md';
  } else {
    // 否则从 positions/{slug} 读取
    filePath = path.join(
      process.cwd(),
      'content/details/positions',
      slug,
      ...docPath
    ) + '.md';
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // 将Markdown转换为HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const htmlContent = processedContent.toString();

  return {
    title: data.title || extractTitle(content),
    content: htmlContent,
    frontmatter: data,
  };
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Document';
}

// 生成metadata
export async function generateMetadata({ params }: DocPageProps) {
  const doc = await getDocContent(params.slug, params.doc);

  if (!doc) {
    return {
      title: '文档未找到 - Mingxi-Info',
    };
  }

  return {
    title: `${doc.title} - Mingxi-Info`,
    description: '职位详细信息',
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocContent(params.slug, params.doc);

  if (!doc) {
    notFound();
  }

  // 获取文档类型（用于面包屑）
  const docType = params.doc[params.doc.length - 1];
  const docTypeMap: Record<string, string> = {
    jd: '职位描述',
    requirements: '技术要求',
    interview: '面试流程',
    'android.platform.hire': '项目需求',
    'android-hiring-plan': '招聘方案',
  };
  const docTypeName = docTypeMap[docType] || docType;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32 pb-16">
        <div className="container">
          {/* 面包屑导航 */}
          <nav className="flex items-center gap-2 text-sm text-tertiary mb-8">
            <Link
              href="/careers"
              className="hover:text-primary transition-colors"
            >
              招聘职位
            </Link>
            <span>/</span>
            <Link
              href={`/careers/${params.slug}`}
              className="hover:text-primary transition-colors"
            >
              {params.slug}
            </Link>
            <span>/</span>
            <span className="text-primary">{docTypeName}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* 返回按钮 */}
            <Link
              href={`/careers/${params.slug}`}
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回职位详情
            </Link>

            {/* 文档标题 */}
            <div className="glass-panel mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
                {doc.title}
              </h1>
              <p className="text-secondary">{docTypeName}</p>
            </div>

            {/* 文档内容 */}
            <div className="glass-card glass-card--lg">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: doc.content }}
              />
            </div>

            {/* 返回按钮 */}
            <div className="mt-8 flex justify-center">
              <Link href={`/careers/${params.slug}`}>
                <Button variant="secondary" size="lg">
                  返回职位详情
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
