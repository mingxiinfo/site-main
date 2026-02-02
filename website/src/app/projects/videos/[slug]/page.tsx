// Mingxi-Info - Video Project Detail Page
// 单个视频项目详情页面

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, Tag } from '@/components/ui';
import {
  getVideoProjectBySlug,
  getAllVideoProjectSlugs,
  getVideoPath,
} from '@/lib/videoProjects';

interface Props {
  params: {
    slug: string;
  };
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllVideoProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: Props) {
  const project = getVideoProjectBySlug(params.slug);

  if (!project) {
    return {
      title: '项目未找到 - Mingxi-Info',
    };
  }

  return {
    title: `${project.name} - 视频项目 - Mingxi-Info`,
    description: project.description,
  };
}

export default function VideoProjectDetailPage({ params }: Props) {
  const project = getVideoProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中':
        return 'text-green-400';
      case '规划中':
        return 'text-yellow-400';
      case '已完成':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen">
      {/* 返回按钮 */}
      <section className="section pt-24">
        <div className="container">
          <Link
            href="/projects/videos"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回视频项目列表
          </Link>
        </div>
      </section>

      {/* 项目标题 */}
      <section className="section pt-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="hero-title text-gradient-primary">
                {project.name}
              </h1>
              <span className={`text-sm font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <p className="text-xl text-secondary mb-6">
              {project.description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Tag key={tag} variant="primary">
                  {tag}
                </Tag>
              ))}
            </div>

            {/* 元信息 */}
            <div className="flex flex-wrap gap-6 text-sm text-tertiary">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>创建于 {new Date(project.createdAt).toLocaleDateString('zh-CN')}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>更新于 {new Date(project.updatedAt).toLocaleDateString('zh-CN')}</span>
              </div>

              {project.videos.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{project.videos.length} 个视频</span>
                </div>
              )}
            </div>

            {/* 外部链接 */}
            {project.links && (
              <div className="flex gap-4 mt-6">
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button glass-button--secondary"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    访问网站
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button glass-button--secondary"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 视频列表 */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {project.videos.map((video, index) => (
              <Card key={index} variant="gradient-border" size="lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 视频播放器 */}
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      controls
                      preload="metadata"
                      className="w-full h-full"
                      poster={video.thumbnail}
                    >
                      <source
                        src={getVideoPath(project.slug, video.filename)}
                        type="video/mp4"
                      />
                      您的浏览器不支持视频播放。
                    </video>
                  </div>

                  {/* 视频信息 */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {video.title}
                    </h3>

                    <p className="text-secondary mb-4">
                      {video.description}
                    </p>

                    {video.duration && (
                      <div className="flex items-center gap-2 text-sm text-tertiary">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>时长：{video.duration}</span>
                      </div>
                    )}

                    {/* 下载按钮 */}
                    <div className="mt-6">
                      <a
                        href={getVideoPath(project.slug, video.filename)}
                        download
                        className="glass-button glass-button--secondary"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        下载视频
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-b from-transparent to-cyan-900/10">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              探索更多项目
            </h2>
            <p className="text-lg text-secondary mb-8">
              了解我们的其他视频项目和技术实现
            </p>
            <Link
              href="/projects/videos"
              className="glass-button glass-button--primary glass-button--lg"
            >
              浏览所有视频项目
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
