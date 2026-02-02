// Mingxi-Info - Position Detail Page
// 职位详情页

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPosition, getAllPositions } from '@/lib/markdown';
import { Button, Tag } from '@/components/ui';

interface PositionPageProps {
  params: {
    slug: string;
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const positions = await getAllPositions();
  return positions.map((position) => ({
    slug: position.slug,
  }));
}

// 生成metadata
export async function generateMetadata({ params }: PositionPageProps) {
  const position = await getPosition(params.slug);

  if (!position) {
    return {
      title: '职位未找到 - Mingxi-Info',
    };
  }

  return {
    title: `${position.frontmatter.title} - Mingxi-Info 招聘`,
    description: position.content.substring(0, 160),
  };
}

export default async function PositionPage({ params }: PositionPageProps) {
  const position = await getPosition(params.slug);

  if (!position) {
    notFound();
  }

  // 从README内容中提取基本信息
  const extractInfo = (content: string, label: string): string => {
    const regex = new RegExp(`-?\\s*\\*\\*${label}\\*\\*[：:](.*?)(?:\\n|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  const recruitNumber = extractInfo(position.content, '招聘人数');
  const experience = extractInfo(position.content, '年资要求');
  const salary = extractInfo(position.content, '薪资范围');
  const location = extractInfo(position.content, '工作地点');

  // 获取其他职位用于推荐
  const allPositions = await getAllPositions();
  const otherPositions = allPositions
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32 pb-16">
        <div className="container">
          {/* 返回按钮 */}
          <Link
            href="/careers"
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
            返回职位列表
          </Link>

          <div className="max-w-5xl mx-auto">
            {/* 标题区域 */}
            <div className="glass-panel mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-6">
                {position.frontmatter.title}
              </h1>

              {/* 快速信息 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {recruitNumber && (
                  <div>
                    <div className="text-sm text-tertiary mb-1">招聘人数</div>
                    <div className="text-lg font-semibold text-primary">
                      {recruitNumber}
                    </div>
                  </div>
                )}
                {experience && (
                  <div>
                    <div className="text-sm text-tertiary mb-1">经验要求</div>
                    <div className="text-lg font-semibold text-primary">
                      {experience}
                    </div>
                  </div>
                )}
                {salary && (
                  <div>
                    <div className="text-sm text-tertiary mb-1">薪资范围</div>
                    <div className="text-lg font-semibold text-primary">
                      {salary}
                    </div>
                  </div>
                )}
                {location && (
                  <div>
                    <div className="text-sm text-tertiary mb-1">工作地点</div>
                    <div className="text-lg font-semibold text-primary">
                      {location}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA按钮 */}
              <div className="flex gap-4">
                <a href="mailto:careers@mingxi-info.com" className="inline-block">
                  <Button variant="primary" size="lg">
                    立即申请
                  </Button>
                </a>
                <Button variant="secondary" size="lg">
                  分享职位
                </Button>
              </div>
            </div>

            {/* 主内容区 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：职位详情 */}
              <div className="lg:col-span-2">
                <div className="glass-card glass-card--lg">
                  <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: position.htmlContent || '' }}
                  />
                </div>
              </div>

              {/* 右侧：Sticky侧边栏 */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* 快速申请 */}
                  <div className="glass-card glass-card--md mb-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      快速申请
                    </h3>
                    <p className="text-sm text-secondary mb-4">
                      请将简历发送至我们的招聘邮箱，我们会尽快与您联系。
                    </p>
                    <a
                      href="mailto:careers@mingxi-info.com"
                      className="block w-full"
                    >
                      <Button variant="primary" size="md" className="w-full">
                        发送简历
                      </Button>
                    </a>
                  </div>

                  {/* 职位亮点 */}
                  <div className="glass-card glass-card--md">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      职位亮点
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-accent text-lg">✓</span>
                        <span className="text-sm text-secondary">
                          创业公司早期成员，绩效奖金
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent text-lg">✓</span>
                        <span className="text-sm text-secondary">
                          技术驱动，扁平化管理
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent text-lg">✓</span>
                        <span className="text-sm text-secondary">
                          大厂背景团队，快速成长
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent text-lg">✓</span>
                        <span className="text-sm text-secondary">
                          弹性工作制，注重效率
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相关职位推荐 */}
      {otherPositions.length > 0 && (
        <section className="section bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="container">
            <h2 className="section-title text-center mb-12">
              <span className="text-gradient-primary">相关职位</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {otherPositions.map((pos) => {
                const posLocation = extractInfo(pos.content, '工作地点');
                const posSalary = extractInfo(pos.content, '薪资范围');

                return (
                  <Link
                    key={pos.slug}
                    href={`/careers/${pos.slug}`}
                    className="block group"
                  >
                    <div className="glass-card glass-card--md h-full group-hover:scale-105 transition-transform duration-300">
                      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-gradient-primary transition-colors">
                        {pos.frontmatter.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {posLocation && (
                          <Tag variant="secondary">
                            📍 {posLocation}
                          </Tag>
                        )}
                        {posSalary && (
                          <Tag variant="accent">
                            💰 {posSalary}
                          </Tag>
                        )}
                      </div>
                      <p className="text-sm text-secondary line-clamp-2">
                        {pos.content.substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
