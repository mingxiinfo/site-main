// Mingxi-Info - Video Projects Page
// 视频项目展示页面

import React from 'react';
import Link from 'next/link';
import { Card, Tag } from '@/components/ui';
import { getAllVideoProjects } from '@/lib/videoProjects';

export const metadata = {
  title: '视频项目 - Mingxi-Info',
  description: '浏览我们的视频项目展示',
};

export default function VideoProjectsPage() {
  const projects = getAllVideoProjects();

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
      {/* Hero Section */}
      <section className="section pt-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="hero-title mb-6">
              <span className="text-gradient-primary">视频</span>
              <br />
              <span className="text-primary">项目展示</span>
            </h1>
            <p className="body-large mb-8">
              通过视频了解我们的项目，观看产品演示和技术实现
            </p>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">🎬</div>
              <div className="text-3xl font-bold text-gradient-primary mb-1">
                {projects.length}
              </div>
              <div className="text-sm text-tertiary">视频项目</div>
            </Card>

            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">📹</div>
              <div className="text-3xl font-bold text-gradient-secondary mb-1">
                {projects.reduce((sum, p) => sum + p.videos.length, 0)}
              </div>
              <div className="text-sm text-tertiary">视频文件</div>
            </Card>

            <Card variant="glow" className="text-center">
              <div className="text-4xl mb-3">🏷️</div>
              <div className="text-3xl font-bold text-gradient-accent mb-1">
                {new Set(projects.flatMap(p => p.tags)).size}
              </div>
              <div className="text-sm text-tertiary">项目标签</div>
            </Card>
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <Card variant="glass" className="text-center">
              <p className="text-secondary text-lg">暂无视频项目</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/videos/${project.slug}`}
                  className="group"
                >
                  <Card
                    variant="gradient-border"
                    className="h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    {/* 封面图 */}
                    <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg mb-4 overflow-hidden">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-6xl">🎬</div>
                        </div>
                      )}
                      {/* 播放按钮悬浮效果 */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* 项目信息 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-primary group-hover:text-gradient-primary">
                          {project.name}
                        </h3>
                        <span className={`text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-sm text-secondary mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* 视频数量 */}
                      <div className="flex items-center gap-2 text-xs text-tertiary mb-4">
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

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} variant="secondary" size="sm">
                            {tag}
                          </Tag>
                        ))}
                        {project.tags.length > 3 && (
                          <Tag variant="secondary" size="sm">
                            +{project.tags.length - 3}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container">
          <div className="glass-panel text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              想了解更多项目？
            </h2>
            <p className="text-lg text-secondary mb-8">
              查看我们所有的项目，包括正在进行的和规划中的
            </p>
            <Link
              href="/projects"
              className="glass-button glass-button--primary glass-button--lg"
            >
              浏览所有项目
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
